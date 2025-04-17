"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { BlogPost } from "@/types/blog"
import { formatDate } from "@/lib/utils"
import { deleteBlogPost, toggleFeaturedStatus } from "@/lib/blog-actions"
import { Plus, Search, Edit, Trash2, MoreVertical, Star, Eye } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface BlogAdminPanelProps {
  posts: BlogPost[]
}

export function BlogAdminPanel({ posts }: BlogAdminPanelProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null)

  // Filter posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categories.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Handle post deletion
  const handleDeleteClick = (post: BlogPost) => {
    setPostToDelete(post)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!postToDelete) return

    try {
      await deleteBlogPost(postToDelete.slug)
      router.refresh()
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Failed to delete post. Please try again.")
    } finally {
      setIsDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  // Handle toggling featured status
  const handleToggleFeatured = async (post: BlogPost) => {
    try {
      await toggleFeaturedStatus(post.slug, !post.featured)
      router.refresh()
    } catch (error) {
      console.error("Error toggling featured status:", error)
      alert("Failed to update featured status. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Blog Management</h1>
        <Link href="/admin/blog/new">
          <Button className="flex items-center gap-1">
            <Plus size={16} />
            New Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <TableRow key={post.slug}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {post.featured && <Star size={16} className="text-yellow-500 fill-yellow-500" />}
                          <span>{post.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(post.date)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.categories.map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/blog/${post.slug}`)}>
                              <Eye size={16} className="mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/admin/blog/edit/${post.slug}`)}>
                              <Edit size={16} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleFeatured(post)}>
                              <Star size={16} className="mr-2" />
                              {post.featured ? "Unfeature" : "Feature"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(post)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      No posts found. {searchTerm ? "Try a different search term." : "Create your first post!"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the post &quot;{postToDelete?.title}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
