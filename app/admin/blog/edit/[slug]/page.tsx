import { BlogEditor } from "@/components/admin/blog-editor"
import { getPostBySlug } from "@/lib/blog-actions"
import { notFound } from "next/navigation"

export default async function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogEditor post={post} isEditing={true} />
}
