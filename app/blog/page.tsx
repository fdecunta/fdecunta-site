import { BlogContent } from "@/components/blog-content"
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/blog-actions"

export default async function Blog() {
  const posts = await getAllPosts()
  const categories = await getAllCategories()
  const tags = await getAllTags()

  return <BlogContent posts={posts} categories={categories} tags={tags} />
}
