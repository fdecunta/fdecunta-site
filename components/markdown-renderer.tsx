"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className={cn("prose prose-gray dark:prose-invert max-w-none", className)}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      components={{
        h1: ({ node, ...props }) => <h1 {...props} className="text-2xl font-medium mt-8 mb-4" />,
        h2: ({ node, ...props }) => <h2 {...props} className="text-xl font-medium mt-8 mb-4" />,
        h3: ({ node, ...props }) => <h3 {...props} className="text-lg font-medium mt-6 mb-3" />,
        h4: ({ node, ...props }) => <h4 {...props} className="text-base font-medium mt-6 mb-3" />,
        p: ({ node, ...props }) => <p {...props} className="my-4 text-muted-foreground leading-relaxed" />,
        a: ({ node, href, ...props }) => {
          if (href?.startsWith("/")) {
            return <Link href={href} {...props} className="font-medium hover:text-muted-foreground transition-colors" />
          }
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
              className="font-medium hover:text-muted-foreground transition-colors"
            />
          )
        },
        ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-6 my-4 space-y-2" />,
        ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-6 my-4 space-y-2" />,
        li: ({ node, ...props }) => <li {...props} className="text-muted-foreground" />,
        blockquote: ({ node, ...props }) => (
          <blockquote {...props} className="border-l-2 border-muted pl-4 italic my-6 text-muted-foreground" />
        ),
        img: ({ node, src, alt, ...props }) => {
          if (!src) return null
          return (
            <div className="my-6 relative">
              <Image
                src={src || "/placeholder.svg"}
                alt={alt || ""}
                width={800}
                height={450}
                className="rounded-lg object-cover"
                {...props}
              />
            </div>
          )
        },
        code: ({ node, inline, className, children, ...props }) => {
          if (inline) {
            return (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          }
          return (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          )
        },
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-6">
            <table {...props} className="min-w-full divide-y divide-border" />
          </div>
        ),
        thead: ({ node, ...props }) => <thead {...props} className="bg-muted" />,
        tbody: ({ node, ...props }) => <tbody {...props} className="divide-y divide-border" />,
        tr: ({ node, ...props }) => <tr {...props} className="hover:bg-muted/50" />,
        th: ({ node, ...props }) => (
          <th
            {...props}
            className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
          />
        ),
        td: ({ node, ...props }) => <td {...props} className="px-4 py-3 text-sm text-muted-foreground" />,
        hr: ({ node, ...props }) => <hr {...props} className="my-8 border-border" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
