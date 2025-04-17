export interface BlogPost {
  slug: string
  title: string
  title_es?: string
  description: string
  description_es?: string
  content: string
  content_es?: string
  date: string
  author: string
  readingTime: number
  coverImage: string
  categories: string[]
  tags: string[]
  featured?: boolean
  language?: "en" | "es" | "both"
}
