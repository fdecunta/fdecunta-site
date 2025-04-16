"use client"

import Link from "next/link"
import { BookOpen, FileText, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { publications, bookChapters, conferences } from "@/data/publications"

// No custom icons needed for simplified publication links

export function PublicationsContent() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Header */}
      <section className="py-12 border-b">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-medium">{t("publications")}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="journals" className="w-full">
              <TabsList className="w-full flex justify-center mb-8 bg-transparent border-b">
                <TabsTrigger
                  value="journals"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-mono-900 data-[state=active]:bg-transparent rounded-none px-6 py-2 bg-transparent text-mono-500 data-[state=active]:text-mono-900"
                >
                  {t("journal_articles")}
                </TabsTrigger>
                <TabsTrigger
                  value="books"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-mono-900 data-[state=active]:bg-transparent rounded-none px-6 py-2 bg-transparent text-mono-500 data-[state=active]:text-mono-900"
                >
                  {t("book_chapters")}
                </TabsTrigger>
                <TabsTrigger
                  value="conferences"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-mono-900 data-[state=active]:bg-transparent rounded-none px-6 py-2 bg-transparent text-mono-500 data-[state=active]:text-mono-900"
                >
                  {t("conference_proceedings")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="journals" className="space-y-6">
                {publications.map((pub, index) => (
                  <div key={index} className="p-6 border-b border-mono-200">
                    <h3 className="text-lg font-medium">{pub.title}</h3>
                    <p className="text-mono-600 mt-2 text-sm">{pub.authors}</p>
                    <p className="mt-2 text-sm">
                      <span className="text-mono-900">{pub.journal}</span>, {pub.volume} ({pub.year})
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="font-medium">DOI:</span> {pub.doi}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {pub.link && (
                        <Link
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-mono-900 hover:underline"
                        >
                          <FileText size={14} className="mr-1" />
                          {t("view_publication")}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="books" className="space-y-6">
                {bookChapters.map((chapter, index) => (
                  <div key={index} className="p-6 border-b border-mono-200">
                    <h3 className="text-lg font-medium">{chapter.title}</h3>
                    <p className="text-mono-600 mt-2 text-sm">{chapter.authors}</p>
                    <p className="mt-2 text-sm">
                      In: <span className="italic">{chapter.book}</span>
                    </p>
                    <p className="mt-1 text-sm">Editors: {chapter.editors}</p>
                    <p className="mt-1 text-sm">
                      {chapter.publisher}, pp. {chapter.pages} ({chapter.year})
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {chapter.link && (
                        <Link
                          href={chapter.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-mono-900 hover:underline"
                        >
                          <BookOpen size={14} className="mr-1" />
                          {t("view_chapter")}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="conferences" className="space-y-6">
                {conferences.map((conf, index) => (
                  <div key={index} className="p-6 border-b border-mono-200">
                    <h3 className="text-lg font-medium">{conf.title}</h3>
                    <p className="text-mono-600 mt-2 text-sm">{conf.authors}</p>
                    <p className="mt-2 text-sm">{conf.conference}</p>
                    <p className="mt-1 text-sm">
                      {conf.location}, {conf.date}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {conf.link && (
                        <Link
                          href={conf.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-mono-900 hover:underline"
                        >
                          <Users size={14} className="mr-1" />
                          {t("view_proceedings")}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
