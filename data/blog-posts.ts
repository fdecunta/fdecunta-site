export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  date: string
  author: string
  readingTime: number
  coverImage: string
  categories: string[]
  tags: string[]
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: "bla-bla",
    title: "Test title",
    description: "Blog posts tend to be nice",
    content: `
# Fake post

This is not a blogpost.

    `,
    date: "2023-08-22",
    author: "Fake fd",
    readingTime: 6,
    coverImage: "/placeholder.svg?height=600&width=1200",
    categories: ["Fieldwork", "Research"],
    tags: ["Fake post", "Just test", "foo"],
    featured: false,
  },
 },
]

// Helper functions
export function getAllPosts() {
  return blogPosts
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getFeaturedPosts() {
  return blogPosts.filter((post) => post.featured)
}

export function getRecentPosts(count = 3) {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count)
}

export function getAllCategories() {
  const categories = new Set<string>()
  blogPosts.forEach((post) => {
    post.categories.forEach((category) => {
      categories.add(category)
    })
  })
  return Array.from(categories)
}

export function getAllTags() {
  const tags = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag)
    })
  })
  return Array.from(tags)
}

export function getPostsByCategory(category: string) {
  return blogPosts.filter((post) => post.categories.some((cat) => cat.toLowerCase() === category.toLowerCase()))
}

export function getPostsByTag(tag: string) {
  return blogPosts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}
