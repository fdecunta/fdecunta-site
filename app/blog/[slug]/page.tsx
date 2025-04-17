import { BlogPostContent } from "@/components/blog-post-content"
import { getPostBySlug, getAllPosts, getRecentPosts } from "@/lib/blog-actions"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      languages: {
        "en-US": `/en/blog/${post.slug}`,
        "es-ES": `/es/blog/${post.slug}`,
      },
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const recentPosts = await getRecentPosts(3)
  const filteredRecentPosts = recentPosts.filter((p) => p.slug !== post.slug)

  return <BlogPostContent post={post} recentPosts={filteredRecentPosts} />
}
