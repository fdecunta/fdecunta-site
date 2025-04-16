"use client"

import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { GoogleScholarIcon } from "@/components/icons/google-scholar-icon"
import { OrcidIcon } from "@/components/icons/orcid-icon"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 border-t">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-medium mb-1">Jane Smith</h3>
              <p className="text-mono-500 text-sm">{t("phd_title")}</p>
            </div>
            <div className="flex gap-6">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="text-mono-500 hover:text-mono-900 transition-colors" size={20} />
              </Link>
              <Link
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Scholar"
              >
                <GoogleScholarIcon className="text-mono-500 hover:text-mono-900 transition-colors h-5 w-5" />
              </Link>
              <Link href="https://orcid.org" target="_blank" rel="noopener noreferrer" aria-label="ORCID">
                <OrcidIcon className="text-mono-500 hover:text-mono-900 transition-colors h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="text-mono-500 hover:text-mono-900 transition-colors" size={20} />
              </Link>
            </div>
          </div>
          <div className="border-t border-mono-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-mono-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} {t("dr_title")}. {t("all_rights_reserved")}
            </p>
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link href="/" className="text-sm text-mono-500 hover:text-mono-900 transition-colors">
                    {t("home")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-mono-500 hover:text-mono-900 transition-colors">
                    {t("about")}
                  </Link>
                </li>
                <li>
                  <Link href="/publications" className="text-sm text-mono-500 hover:text-mono-900 transition-colors">
                    {t("publications")}
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-sm text-mono-500 hover:text-mono-900 transition-colors">
                    {t("gallery")}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
