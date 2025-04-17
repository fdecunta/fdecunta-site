"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Badge } from "@/components/ui/badge"
import { createBlogPost, updateBlogPost, uploadImage } from "@/lib/blog-actions"
import type { BlogPost } from "@/types/blog"
import { X, Upload, Eye, Edit, Plus, ImageIcon } from "lucide-react"
import { formatSlug } from "@/lib/utils"
import Image from "next/image"

interface BlogEditorProps {
  post?: BlogPost
  isEditing?: boolean
}

export function BlogEditor({ post, isEditing = false }: BlogEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [description, setDescription] = useState(post?.description || "")
  const [content, setContent] = useState(post?.content || "")
  const [coverImage, setCoverImage] = useState(post?.coverImage || "/placeholder.svg?height=600&width=1200")
  const [date, setDate] = useState(post?.date || new Date().toISOString().split("T")[0])
  const [author, setAuthor] = useState(post?.author || "Dr. Jane Smith")
  const [readingTime, setReadingTime] = useState(post?.readingTime?.toString() || "5")
  const [categories, setCategories] = useState<string[]>(post?.categories || [])
  const [tags, setTags] = useState<string[]>(post?.tags || [])
  const [newCategory, setNewCategory] = useState("")
  const [newTag, setNewTag] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("edit")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  // Update the blog editor to support multilingual content

  // 1. Add state variables for Spanish content after the existing content state:
  const [titleEs, setTitleEs] = useState(post?.title_es || "")
  const [descriptionEs, setDescriptionEs] = useState(post?.description_es || "")
  const [contentEs, setContentEs] = useState(post?.content_es || "")
  const [language, setLanguage] = useState<"en" | "es" | "both">(post?.language || "en")

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (!isEditing) {
      setSlug(formatSlug(e.target.value))
    }
  }

  // Handle category and tag management
  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      setNewCategory("")
    }
  }

  const removeCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category))
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  // Handle image uploads
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImage(true)
    setUploadProgress(0)

    try {
      const file = files[0]
      const imageUrl = await uploadImage(file, (progress) => {
        setUploadProgress(progress)
      })

      // Insert image markdown at cursor position or at the end
      const imageMarkdown = `\n![${file.name.split(".")[0]}](${imageUrl})\n`
      setContent((prevContent) => prevContent + imageMarkdown)

      if (imageInputRef.current) {
        imageInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setUploadingImage(false)
    }
  }

  // Handle cover image upload
  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImage(true)
    setUploadProgress(0)

    try {
      const file = files[0]
      const imageUrl = await uploadImage(file, (progress) => {
        setUploadProgress(progress)
      })
      setCoverImage(imageUrl)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error uploading cover image:", error)
      alert("Failed to upload cover image. Please try again.")
    } finally {
      setUploadingImage(false)
    }
  }

  // Calculate reading time based on content length
  const calculateReadingTime = useCallback(() => {
    const wordsPerMinute = 200
    const wordCount = content.trim().split(/\s+/).length
    const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))
    setReadingTime(readingTime.toString())
  }, [content])

  // Save the blog post
  const handleSave = async () => {
    if (!title || !content || !slug) {
      alert("Please fill in all required fields (title, content, and slug)")
      return
    }

    setIsSaving(true)

    try {
      // 2. Update the handleSave function to include Spanish content in the postData object:
      const postData: BlogPost = {
        title,
        title_es: titleEs,
        slug,
        description,
        description_es: descriptionEs,
        content,
        content_es: contentEs,
        coverImage,
        date,
        author,
        readingTime: Number.parseInt(readingTime),
        categories,
        tags,
        featured: post?.featured || false,
        language,
      }

      if (isEditing && post) {
        await updateBlogPost(post.slug, postData)
        router.push(`/admin/blog/${slug}`)
      } else {
        await createBlogPost(postData)
        router.push("/admin/blog")
      }
    } catch (error) {
      console.error("Error saving blog post:", error)
      alert("Failed to save blog post. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/blog")}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and slug */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter post title"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(formatSlug(e.target.value))}
                  placeholder="post-url-slug"
                  disabled={isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the post"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content editor with preview */}
          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between px-6 pt-6">
                <TabsList>
                  <TabsTrigger value="edit" className="flex items-center gap-1">
                    <Edit size={14} />
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center gap-1">
                    <Eye size={14} />
                    Preview
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="flex items-center gap-1"
                  >
                    <ImageIcon size={14} />
                    {uploadingImage ? `Uploading ${uploadProgress}%` : "Insert Image"}
                  </Button>
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <TabsContent value="edit" className="p-6 pt-4">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content in Markdown..."
                  className="min-h-[500px] font-mono text-sm"
                  onBlur={calculateReadingTime}
                />
              </TabsContent>

              <TabsContent value="preview" className="border-t">
                <div className="p-6 prose max-w-none">
                  <MarkdownRenderer content={content} />
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          {/* 4. Add Spanish content fields after the main content editor card: */}
          {language === "both" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Spanish Content</CardTitle>
                <CardDescription>Provide Spanish translations for your content</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title_es">Spanish Title</Label>
                  <Input
                    id="title_es"
                    value={titleEs}
                    onChange={(e) => setTitleEs(e.target.value)}
                    placeholder="Enter Spanish title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description_es">Spanish Description</Label>
                  <Textarea
                    id="description_es"
                    value={descriptionEs}
                    onChange={(e) => setDescriptionEs(e.target.value)}
                    placeholder="Brief description in Spanish"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content_es">Spanish Content (Markdown)</Label>
                  <Textarea
                    id="content_es"
                    value={contentEs}
                    onChange={(e) => setContentEs(e.target.value)}
                    placeholder="Write your post content in Spanish using Markdown..."
                    className="min-h-[300px] font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar with metadata */}
        <div className="space-y-6">
          {/* Publication details */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-medium">Publication Details</h3>

              <div className="space-y-2">
                <Label htmlFor="date">Publication Date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readingTime">Reading Time (minutes)</Label>
                <Input
                  id="readingTime"
                  type="number"
                  min="1"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                />
              </div>
              {/* 3. Add language selection after the reading time input in the Publication Details card: */}
              <div className="space-y-2">
                <Label htmlFor="language">Content Language</Label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "en" | "es" | "both")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="en">English Only</option>
                  <option value="es">Spanish Only</option>
                  <option value="both">Bilingual (English & Spanish)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Cover image */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-medium">Cover Image</h3>

              <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                <Image src={coverImage || "/placeholder.svg"} alt="Cover image" fill className="object-cover" />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="w-full"
                >
                  <Upload size={16} className="mr-2" />
                  {uploadingImage ? `Uploading ${uploadProgress}%` : "Upload Cover Image"}
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCoverImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories and tags */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Categories</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {categories.map((category) => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add category"
                    onKeyDown={(e) => e.key === "Enter" && addCategory()}
                  />
                  <Button type="button" variant="outline" onClick={addCategory} size="icon">
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button type="button" variant="outline" onClick={addTag} size="icon">
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
