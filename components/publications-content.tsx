"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PublicationsContent() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Header */}
      <section className="py-20 bg-secondary/30 grid-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">{t("publications")}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="journals" className="w-full">
              <TabsList className="w-full flex justify-center mb-12 bg-transparent border-b">
                <TabsTrigger
                  value="journals"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-8 py-2 bg-transparent data-[state=active]:bg-transparent text-sm font-medium"
                >
                  {t("journal_articles")}
                </TabsTrigger>
                <TabsTrigger
                  value="books"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-8 py-2 bg-transparent data-[state=active]:bg-transparent text-sm font-medium"
                >
                  {t("book_chapters")}
                </TabsTrigger>
                <TabsTrigger
                  value="conferences"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-8 py-2 bg-transparent data-[state=active]:bg-transparent text-sm font-medium"
                >
                  {t("conference_proceedings")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="journals" className="space-y-8">
                {publications.map((pub, index) => (
                  <div
                    key={index}
                    className="p-8 bg-white rounded-lg border border-black/5 shadow-sm hover:shadow-md transition-shadow hover-lift"
                  >
                    <h3 className="text-xl font-semibold">{pub.title}</h3>
                    <p className="text-muted-foreground mt-2">{pub.authors}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        {pub.journal}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        {pub.year}
                      </span>
                    </div>
                    <p className="mt-4 text-sm">
                      <span className="font-medium">DOI:</span> {pub.doi}
                    </p>
                    {pub.link && (
                      <Link
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 text-sm font-medium text-black hover:underline"
                      >
                        {t("view_publication")} <ExternalLink size={14} className="ml-1" />
                      </Link>
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="books" className="space-y-8">
                {bookChapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="p-8 bg-white rounded-lg border border-black/5 shadow-sm hover:shadow-md transition-shadow hover-lift"
                  >
                    <h3 className="text-xl font-semibold">{chapter.title}</h3>
                    <p className="text-muted-foreground mt-2">{chapter.authors}</p>
                    <p className="mt-4 text-sm">
                      <span className="font-medium">In:</span> {chapter.book}
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="font-medium">Editors:</span> {chapter.editors}
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="font-medium">Publisher:</span> {chapter.publisher}, pp. {chapter.pages}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        {chapter.year}
                      </span>
                    </div>
                    {chapter.link && (
                      <Link
                        href={chapter.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 text-sm font-medium text-black hover:underline"
                      >
                        {t("view_chapter")} <ExternalLink size={14} className="ml-1" />
                      </Link>
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="conferences" className="space-y-8">
                {conferences.map((conf, index) => (
                  <div
                    key={index}
                    className="p-8 bg-white rounded-lg border border-black/5 shadow-sm hover:shadow-md transition-shadow hover-lift"
                  >
                    <h3 className="text-xl font-semibold">{conf.title}</h3>
                    <p className="text-muted-foreground mt-2">{conf.authors}</p>
                    <p className="mt-4 text-sm">
                      <span className="font-medium">Conference:</span> {conf.conference}
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="font-medium">Location:</span> {conf.location}
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="font-medium">Date:</span> {conf.date}
                    </p>
                    {conf.link && (
                      <Link
                        href={conf.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 text-sm font-medium text-black hover:underline"
                      >
                        {t("view_proceedings")} <ExternalLink size={14} className="ml-1" />
                      </Link>
                    )}
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

const publications = [
  {
    title: "An appraisal of the protection conferred by foliar Epichloë endophytes against root herbivores in plants: A meta-analysis",
    authors: "Decunta, F.A., Gundel, P.E., Bastías, D.A.",
    journal: "Fungal Biology Reviews",
    volume: "52",
    pages: "100428",
    year: 2025,
    doi: "https://doi.org/10.1016/j.fbr.2025.100428",
    link: "https://doi.org/10.1016/j.fbr.2025.100428",
  },
  {
    title: "Foliar phosphorus concentration modulates the defensive mutualism of an endophytic fungus in a perennial host grass",
    authors: "F.A, Decunta, L. I. Pérez, P. Graff, P.E. Gundel",
    journal: "Functional Ecology",
    volume: "38(9)",
    pages: "2041-2053",
    year: 2024,
    doi: "https://doi.org/10.1111/1365-2435.14616",
    link: "https://doi.org/10.1111/1365-2435.14616",
  },
  {
    title: "A Systematic Review on the Effects of Epichloë Fungal Endophytes on Drought Tolerance in Cool-Season Grasses",
    authors: "Decunta, F.A., Pérez, L.I., Malinowski, D.P., Molina-Montenegro, M.A., Gundel, P.E.",
    journal: "Frontiers in Plant Science",
    volume: "13",
    pages: "644731",
    year: 2021,
    doi: "https://doi.org/10.3389/fpls.2021.644731",
    link: "https://doi.org/10.3389/fpls.2021.644731",
  },
]
const bookChapters = [
  {
  },
]

const conferences = [
  {
    title: "Fake title",
    authors: "Foo Bar, John Doe",
    conference: "International Conference on Forest Ecology",
    location: "New York, USA",
    date: "September 3-6, 2023",
    link: "https://example.com/conference1",
  },
]
