"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { GoogleScholarIcon } from "@/components/icons/google-scholar-icon"
import { OrcidIcon } from "@/components/icons/orcid-icon"
import { useEffect } from "react"

export default function Home() {
  const { t, language } = useLanguage()

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
    }
  }, [language])

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container-medium">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t("phd_title")}</p>
              <h1 className="text-4xl font-medium tracking-tight">{t("dr_title")}</h1>
              <p className="text-lg text-muted-foreground">{t("short_intro")}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/about">
                  <Button className="group">
                    {t("about_me")}
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/publications">
                  <Button variant="outline">{t("view_publications")}</Button>
                </Link>
              </div>

              {/* Social Media Buttons */}
              <div className="pt-6">
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">Connect</h3>
                <div className="flex flex-wrap gap-3">
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="h-10">
                      <Github size={16} className="mr-2" />
                      GitHub
                    </Button>
                  </Link>
                  <Link href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="h-10">
                      <GoogleScholarIcon className="h-4 w-4 mr-2" />
                      Google Scholar
                    </Button>
                  </Link>
                  <Link href="https://orcid.org" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="h-10">
                      <OrcidIcon className="h-4 w-4 mr-2" />
                      ORCID
                    </Button>
                  </Link>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="h-10">
                      <Linkedin size={16} className="mr-2" />
                      LinkedIn
                    </Button>
                  </Link>
                  <Link href="mailto:jane.smith@university.edu">
                    <Button variant="outline" size="sm" className="h-10">
                      <Mail size={16} className="mr-2" />
                      Email
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative aspect-square max-w-sm mx-auto">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Profile Photo"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 bg-muted/50">
        <div className="container-medium">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-medium mb-4">Contact Information</h2>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground">Department of Ecology, {t("university")}, Seattle, WA 98195</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground">jane.smith@university.edu</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
