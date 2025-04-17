import { BlogAdminPanel } from "@/components/admin/blog-admin-panel"
import { getAllPosts } from "@/lib/blog-actions"

export default async function BlogAdminPage() {
  const posts = await getAllPosts()

  return <BlogAdminPanel posts={posts} />
}
