"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, ExternalLink, ArrowRight, MapPin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  return <HomeContent />
}

function HomeContent() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero Section */}
      <section className="py-24 md:py-32 grid-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">{t("dr_title")}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t("phd_title")} {t("short_intro")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/about">
                <Button className="h-12 px-8 rounded-md bg-black text-white hover:bg-black/90">
                  {t("about_me")}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/publications">
                <Button
                  variant="outline"
                  className="h-12 px-8 rounded-md border-black/10 hover:bg-black hover:text-white"
                >
                  {t("view_publications")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 md:w-72 md:h-72 overflow-hidden rounded-full border-8 border-white shadow-xl">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Profile Photo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="space-y-6">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-black flex-shrink-0" />
                    <span className="text-muted-foreground">
		    {t("department")}, {t("university")}, Buenos Aires, Argentina
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-black flex-shrink-0" />
                    <span className="text-muted-foreground">fdecunta@agro.uba.ar</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="https://github.com/fdecunta" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-md border-black/10 hover:bg-black hover:text-white hover-lift"
                    >
                      <Github size={16} className="mr-2" />
                      GitHub
                    </Button>
                  </Link>
                  <Link href="https://scholar.google.co.in/citations?user=ZuiT7QMAAAAJ&hl=es&oi=ao" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-md border-black/10 hover:bg-black hover:text-white hover-lift"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Google Scholar
                    </Button>
                  </Link>
                  <Link href="https://orcid.org/0009-0004-5774-1085" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-md border-black/10 hover:bg-black hover:text-white hover-lift"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      ORCID
                    </Button>
                  </Link>
                  <Link href="https://www.linkedin.com/in/facundo-decunta-06ba39291/" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-md border-black/10 hover:bg-black hover:text-white hover-lift"
                    >
                      <Linkedin size={16} className="mr-2" />
                      LinkedIn
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-bold">{t("recent_publications")}</h2>
              <Link href="/publications">
                <Button variant="link" className="text-black font-medium flex items-center gap-1 hover:no-underline">
                  {t("view_all_publications")}
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {[
                {
                  title: "Climate-driven shifts in forest composition across temperate regions",
                  authors: "Smith, J., Johnson, A., Williams, B. (2023)",
                  journal: "Journal of Ecology, 111(3), 567-582",
                },
                {
                  title: "Long-term monitoring reveals biodiversity loss in protected areas",
                  authors: "Smith, J., Brown, C., Davis, E. (2022)",
                  journal: "Conservation Biology, 36(2), 234-248",
                },
              ].map((pub, index) => (
                <div
                  key={index}
                  className="p-8 bg-white rounded-lg border border-black/5 shadow-sm hover:shadow-md transition-shadow hover-lift"
                >
                  <h3 className="text-xl font-semibold">{pub.title}</h3>
                  <p className="text-muted-foreground mt-2">{pub.authors}</p>
                  <p className="mt-2">{pub.journal}</p>
                  <Link
                    href="/publications"
                    className="inline-flex items-center mt-4 text-sm font-medium text-black hover:underline"
                  >
                    {t("read_more")}
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
