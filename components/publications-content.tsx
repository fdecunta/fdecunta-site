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
    title: "Climate-driven shifts in forest composition across temperate regions",
    authors: "Smith, J., Johnson, A., Williams, B.",
    journal: "Journal of Ecology",
    volume: "111(3), 567-582",
    pages: "567-582",
    year: 2023,
    doi: "10.1111/jec.13579",
    link: "https://example.com/publication1",
  },
  {
    title: "Long-term monitoring reveals biodiversity loss in protected areas",
    authors: "Smith, J., Brown, C., Davis, E.",
    journal: "Conservation Biology",
    volume: "36(2)",
    pages: "234-248",
    year: 2022,
    doi: "10.1111/cobi.13821",
    link: "https://example.com/publication2",
  },
  {
    title: "Ecological resilience of forest ecosystems under climate change",
    authors: "Smith, J., Garcia, M., Wilson, T.",
    journal: "Nature Ecology & Evolution",
    volume: "5(8)",
    pages: "1043-1052",
    year: 2021,
    doi: "10.1038/s41559-021-01485-1",
    link: "https://example.com/publication3",
  },
  {
    title: "Impacts of drought on understory plant communities in temperate forests",
    authors: "Smith, J., Taylor, R.",
    journal: "Plant Ecology",
    volume: "217(4)",
    pages: "401-413",
    year: 2020,
    doi: "10.1007/s11258-020-01018-z",
    link: "https://example.com/publication4",
  },
  {
    title: "Soil microbial diversity as an indicator of forest health",
    authors: "Johnson, K., Smith, J., Lee, P.",
    journal: "Soil Biology and Biochemistry",
    volume: "142",
    pages: "107-118",
    year: 2020,
    doi: "10.1016/j.soilbio.2019.12.008",
    link: "https://example.com/publication5",
  },
]

const bookChapters = [
  {
    title: "Forest Ecosystem Responses to Climate Change",
    authors: "Smith, J., Anderson, L.",
    book: "Climate Change and Terrestrial Ecosystems",
    editors: "Roberts, M., Chen, W.",
    publisher: "Academic Press, London",
    pages: "123-145",
    year: 2022,
    link: "https://example.com/bookchapter1",
  },
  {
    title: "Conservation Strategies for Vulnerable Forest Species",
    authors: "Smith, J., Miller, S., Thompson, J.",
    book: "Biodiversity Conservation in the Anthropocene",
    editors: "Wilson, A., Brown, D.",
    publisher: "Springer, New York",
    pages: "211-230",
    year: 2021,
    link: "https://example.com/bookchapter2",
  },
]

const conferences = [
  {
    title: "Monitoring forest biodiversity using remote sensing techniques",
    authors: "Smith, J., Davis, R.",
    conference: "International Conference on Ecology and Conservation",
    location: "Barcelona, Spain",
    date: "June 15-18, 2023",
    link: "https://example.com/conference1",
  },
  {
    title: "Adaptive management approaches for forest conservation",
    authors: "Smith, J., Wilson, T., Brown, C.",
    conference: "Annual Meeting of the Ecological Society of America",
    location: "Portland, OR, USA",
    date: "August 7-12, 2022",
    link: "https://example.com/conference2",
  },
  {
    title: "Citizen science contributions to long-term ecological monitoring",
    authors: "Smith, J., Garcia, M.",
    conference: "European Congress of Conservation Biology",
    location: "Prague, Czech Republic",
    date: "September 3-6, 2021",
    link: "https://example.com/conference3",
  },
]
