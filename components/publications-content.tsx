"use client"

import Link from "next/link"
import { BookOpen, FileText, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { publications, bookChapters, conferences } from "@/data/publications"
import { Card, CardContent } from "@/components/ui/card"

export function PublicationsContent() {
  const { t } = useLanguage()

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="pt-12 pb-6">
        <div className="container-narrow">
          <h1 className="text-3xl font-medium">{t("publications")}</h1>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="container-medium">
          <Tabs defaultValue="journals" className="w-full">
            <TabsList className="w-full flex justify-center mb-8 bg-transparent border-b rounded-none">
              <TabsTrigger
                value="journals"
                className="data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none px-6 py-2 bg-transparent text-muted-foreground data-[state=active]:text-foreground"
              >
                {t("journal_articles")}
              </TabsTrigger>
              <TabsTrigger
                value="books"
                className="data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none px-6 py-2 bg-transparent text-muted-foreground data-[state=active]:text-foreground"
              >
                {t("book_chapters")}
              </TabsTrigger>
              <TabsTrigger
                value="conferences"
                className="data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none px-6 py-2 bg-transparent text-muted-foreground data-[state=active]:text-foreground"
              >
                {t("conference_proceedings")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="journals" className="space-y-4">
              {publications.map((pub, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">{pub.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{pub.authors}</p>
                    <p className="text-sm mb-2">
                      <span className="font-medium">{pub.journal}</span>, {pub.volume} ({pub.year})
                    </p>
                    <p className="text-sm mb-3">
                      <span className="font-medium">DOI:</span> {pub.doi}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {pub.link && (
                        <Link
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium hover:text-muted-foreground transition-colors"
                        >
                          <FileText size={14} className="mr-1" />
                          {t("view_publication")}
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="books" className="space-y-4">
              {bookChapters.map((chapter, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">{chapter.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{chapter.authors}</p>
                    <p className="text-sm mb-1">
                      In: <span className="italic">{chapter.book}</span>
                    </p>
                    <p className="text-sm mb-1">Editors: {chapter.editors}</p>
                    <p className="text-sm mb-3">
                      {chapter.publisher}, pp. {chapter.pages} ({chapter.year})
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {chapter.link && (
                        <Link
                          href={chapter.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium hover:text-muted-foreground transition-colors"
                        >
                          <BookOpen size={14} className="mr-1" />
                          {t("view_chapter")}
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="conferences" className="space-y-4">
              {conferences.map((conf, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">{conf.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{conf.authors}</p>
                    <p className="text-sm mb-1">{conf.conference}</p>
                    <p className="text-sm mb-3">
                      {conf.location}, {conf.date}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {conf.link && (
                        <Link
                          href={conf.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium hover:text-muted-foreground transition-colors"
                        >
                          <Users size={14} className="mr-1" />
                          {t("view_proceedings")}
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
