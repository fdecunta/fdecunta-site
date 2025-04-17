"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/types/blog"
import { Card, CardContent } from "@/components/ui/card"

interface BlogPostContentProps {
  post: BlogPost
  recentPosts: BlogPost[]
}

export function BlogPostContent({ post, recentPosts }: BlogPostContentProps) {
  const { t, language } = useLanguage()

  // Get content based on language
  const getLocalizedContent = () => {
    // If the post has language-specific content fields, use them
    if (post.content_es && language === "es") {
      return post.content_es
    }
    return post.content
  }

  return (
    <div className="space-y-12">
      {/* Back link */}
      <div className="container-narrow pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          {t("back_to_blog")}
        </Link>
      </div>

      {/* Header */}
      <section className="container-narrow">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl font-medium">{post.title}</h1>

          <p className="text-sm text-muted-foreground">
            {t("published_on")} {formatDate(post.date)} • {post.readingTime} {t("minutes_read")}
          </p>

          <p className="text-muted-foreground">{post.description}</p>
        </div>
      </section>

      {/* Cover Image */}
      <section className="container-medium">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>
      </section>

      {/* Content */}
      <section className="container-narrow">
        <MarkdownRenderer content={getLocalizedContent()} />

        {/* Tags */}
        <div className="mt-12 pt-6 border-t">
          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">{t("tags")}</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="container-wide py-12 border-t">
          <h2 className="text-2xl font-medium mb-8">{t("recent_posts")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((recentPost) => (
              <Card key={recentPost.slug} className="border overflow-hidden h-full flex flex-col">
                <Link href={`/blog/${recentPost.slug}`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={recentPost.coverImage || "/placeholder.svg"}
                      alt={recentPost.title}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                </Link>
                <CardContent className="flex-1 flex flex-col p-5">
                  <h3 className="text-lg font-medium mb-2">
                    <Link href={`/blog/${recentPost.slug}`} className="hover:text-muted-foreground transition-colors">
                      {recentPost.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {formatDate(recentPost.date)} • {recentPost.readingTime} {t("minutes_read")}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{recentPost.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
