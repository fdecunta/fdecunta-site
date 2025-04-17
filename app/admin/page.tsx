import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Plus } from "lucide-react"
import { getAllPosts } from "@/lib/blog-actions"

export default async function AdminDashboard() {
  const posts = await getAllPosts()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Manage your blog content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{posts.length}</div>
              <Link href="/admin/blog">
                <Button variant="outline" className="flex items-center gap-1">
                  <FileText size={16} />
                  Manage Posts
                </Button>
              </Link>
            </div>
            <div className="mt-4">
              <Link href="/admin/blog/new">
                <Button className="w-full flex items-center gap-1">
                  <Plus size={16} />
                  Create New Post
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
