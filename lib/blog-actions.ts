"use server"

import fs from "fs/promises"
import path from "path"
import type { BlogPost } from "@/types/blog"

const BLOG_DIR = path.join(process.cwd(), "data", "blog")
const IMAGES_DIR = path.join(process.cwd(), "public", "blog-images")

// Ensure directories exist
async function ensureDirectories() {
  try {
    await fs.mkdir(BLOG_DIR, { recursive: true })
    await fs.mkdir(IMAGES_DIR, { recursive: true })
  } catch (error) {
    console.error("Error creating directories:", error)
  }
}

// Get all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  await ensureDirectories()

  try {
    const files = await fs.readdir(BLOG_DIR)
    const jsonFiles = files.filter((file) => file.endsWith(".json"))

    const posts = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await fs.readFile(path.join(BLOG_DIR, file), "utf-8")
        return JSON.parse(content) as BlogPost
      }),
    )

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

// Get a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  await ensureDirectories()

  try {
    const filePath = path.join(BLOG_DIR, `${slug}.json`)
    const content = await fs.readFile(filePath, "utf-8")
    return JSON.parse(content) as BlogPost
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

// Create a new blog post
export async function createBlogPost(post: BlogPost): Promise<boolean> {
  await ensureDirectories()

  try {
    // Check if post with this slug already exists
    const existingPost = await getPostBySlug(post.slug)
    if (existingPost) {
      throw new Error(`A post with slug "${post.slug}" already exists`)
    }

    const filePath = path.join(BLOG_DIR, `${post.slug}.json`)
    await fs.writeFile(filePath, JSON.stringify(post, null, 2), "utf-8")
    return true
  } catch (error) {
    console.error("Error creating blog post:", error)
    throw error
  }
}

// Update an existing blog post
export async function updateBlogPost(oldSlug: string, post: BlogPost): Promise<boolean> {
  await ensureDirectories()

  try {
    const oldFilePath = path.join(BLOG_DIR, `${oldSlug}.json`)

    // If slug has changed, delete the old file
    if (oldSlug !== post.slug) {
      await fs.unlink(oldFilePath)
    }

    const newFilePath = path.join(BLOG_DIR, `${post.slug}.json`)
    await fs.writeFile(newFilePath, JSON.stringify(post, null, 2), "utf-8")
    return true
  } catch (error) {
    console.error("Error updating blog post:", error)
    throw error
  }
}

// Delete a blog post
export async function deleteBlogPost(slug: string): Promise<boolean> {
  await ensureDirectories()

  try {
    const filePath = path.join(BLOG_DIR, `${slug}.json`)
    await fs.unlink(filePath)
    return true
  } catch (error) {
    console.error("Error deleting blog post:", error)
    throw error
  }
}

// Toggle featured status
export async function toggleFeaturedStatus(slug: string, featured: boolean): Promise<boolean> {
  await ensureDirectories()

  try {
    const post = await getPostBySlug(slug)
    if (!post) {
      throw new Error(`Post with slug "${slug}" not found`)
    }

    post.featured = featured

    const filePath = path.join(BLOG_DIR, `${slug}.json`)
    await fs.writeFile(filePath, JSON.stringify(post, null, 2), "utf-8")
    return true
  } catch (error) {
    console.error("Error toggling featured status:", error)
    throw error
  }
}

// Upload an image
export async function uploadImage(file: File, onProgress?: (progress: number) => void): Promise<string> {
  await ensureDirectories()

  try {
    // Generate a unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split(".").pop()
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, "-").toLowerCase()}`
    const filePath = path.join(IMAGES_DIR, fileName)

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Write file to disk
    await fs.writeFile(filePath, buffer)

    // Return the public URL
    return `/blog-images/${fileName}`
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

// Get all categories
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categoriesSet = new Set<string>()

  posts.forEach((post) => {
    post.categories.forEach((category) => {
      categoriesSet.add(category)
    })
  })

  return Array.from(categoriesSet)
}

// Get all tags
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tagsSet = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagsSet.add(tag)
    })
  })

  return Array.from(tagsSet)
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.categories.includes(category))
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.featured)
}

// Get recent posts
export async function getRecentPosts(count = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.slice(0, count)
}

// Get posts by language
export async function getPostsByLanguage(lang: "en" | "es"): Promise<BlogPost[]> {
  const posts = await getAllPosts()

  // Filter posts based on language
  return posts.filter((post) => {
    // Include posts that are in the requested language or bilingual
    if (post.language === "both") return true
    if (post.language === lang) return true
    if (!post.language && lang === "en") return true // Default to English for posts without language specified

    return false
  })
}
