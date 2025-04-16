"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, MapPin, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { GoogleScholarIcon } from "@/components/icons/google-scholar-icon"
import { OrcidIcon } from "@/components/icons/orcid-icon"

export default function Home() {
  return <HomeContent />
}

function HomeContent() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6">
              <p className="text-mono-500 mb-2">{t("phd_title")}</p>
              <h1 className="text-4xl md:text-5xl font-medium mb-4">{t("dr_title")}</h1>
              <p className="text-lg text-mono-600 mb-8">{t("short_intro")}</p>

              <div className="flex flex-wrap gap-4">
                <Link href="/about">
                  <Button className="bg-mono-900 hover:bg-mono-800 text-white">
                    {t("about_me")}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/publications">
                  <Button variant="outline" className="border-mono-200 hover:bg-mono-100">
                    {t("view_publications")}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-square max-w-md mx-auto">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Profile Photo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 border-t border-b">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-mono-500 flex-shrink-0" />
                  <span className="text-mono-600">{t("department")}, {t("university")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-mono-500 flex-shrink-0" />
                  <span className="text-mono-600">fdecunta@agro.uba.ar</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="border-mono-200 hover:bg-mono-100">
                    <Github size={16} className="mr-2" />
                    GitHub
                  </Button>
                </Link>
                <Link href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="border-mono-200 hover:bg-mono-100">
                    <GoogleScholarIcon className="h-4 w-4 mr-2" />
                    Google Scholar
                  </Button>
                </Link>
                <Link href="https://orcid.org" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="border-mono-200 hover:bg-mono-100">
                    <OrcidIcon className="h-4 w-4 mr-2" />
                    ORCID
                  </Button>
                </Link>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="border-mono-200 hover:bg-mono-100">
                    <Linkedin size={16} className="mr-2" />
                    LinkedIn
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
