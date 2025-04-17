"use client"

import Link from "next/link"
import { Github, Linkedin, MapPin, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { GoogleScholarIcon } from "@/components/icons/google-scholar-icon"
import { OrcidIcon } from "@/components/icons/orcid-icon"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8 mt-12">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact info */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={16} className="text-muted-foreground mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Department of Ecology, {t("university")}, Seattle, WA 98195
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="text-muted-foreground mr-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">jane.smith@university.edu</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/publications"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("publications")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("gallery")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="text-muted-foreground hover:text-foreground transition-colors" size={18} />
              </Link>
              <Link
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Scholar"
              >
                <GoogleScholarIcon className="text-muted-foreground hover:text-foreground transition-colors h-[18px] w-[18px]" />
              </Link>
              <Link href="https://orcid.org" target="_blank" rel="noopener noreferrer" aria-label="ORCID">
                <OrcidIcon className="text-muted-foreground hover:text-foreground transition-colors h-[18px] w-[18px]" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="text-muted-foreground hover:text-foreground transition-colors" size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} {t("dr_title")}. {t("all_rights_reserved")}
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Jane Smith</span> • {t("phd_title")}
          </p>
        </div>
      </div>
    </footer>
  )
}
