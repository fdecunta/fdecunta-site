"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types/blog"

interface BlogContentProps {
  posts: BlogPost[]
  categories: string[]
  tags: string[]
}

export function BlogContent({ posts, categories, tags }: BlogContentProps) {
  const { t, language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get localized content based on language
  const getLocalizedTitle = (post: BlogPost) => {
    return language === "es" && post.title_es ? post.title_es : post.title
  }

  const getLocalizedDescription = (post: BlogPost) => {
    return language === "es" && post.description_es ? post.description_es : post.description
  }

  // Filter posts based on search term, category, and tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === null || post.categories.includes(selectedCategory)

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag)

    return matchesSearch && matchesCategory && matchesTag
  })

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="pt-12 pb-6">
        <div className="container-narrow">
          <h1 className="text-3xl font-medium mb-2">{t("blog_title")}</h1>
          <p className="text-muted-foreground">{t("blog_description")}</p>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              {/* Search */}
              <div className="relative mb-8">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
                  {t("categories")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer",
                        selectedCategory === category ? "bg-foreground text-background" : "",
                      )}
                      onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">{t("tags")}</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? "default" : "outline"}
                      className={cn("cursor-pointer", selectedTag === tag ? "bg-foreground text-background" : "")}
                      onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              {/* Posts */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <Card key={post.slug} className="border overflow-hidden h-full flex flex-col">
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={post.coverImage || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </div>
                      </Link>

                      <CardContent className="flex-1 flex flex-col p-5">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.map((category) => (
                            <Badge
                              key={category}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>

                        <h2 className="text-xl font-medium mb-2">
                          <Link href={`/blog/${post.slug}`} className="hover:text-muted-foreground transition-colors">
                            {getLocalizedTitle(post)}
                          </Link>
                        </h2>

                        <p className="text-sm text-muted-foreground mb-3">
                          {t("published_on")} {formatDate(post.date)} • {post.readingTime} {t("minutes_read")}
                        </p>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {getLocalizedDescription(post)}
                        </p>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm font-medium mt-auto inline-flex items-center hover:text-muted-foreground transition-colors"
                        >
                          {t("read_post")}
                          <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-secondary rounded-lg">
                  <p className="text-muted-foreground">{t("no_posts")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
