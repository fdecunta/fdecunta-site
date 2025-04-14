"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function AboutContent() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Header */}
      <section className="py-20 bg-secondary/30 grid-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">{t("about_me")}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="col-span-1 flex justify-center md:justify-start">
                <div className="relative w-64 h-64 overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src="/placeholder.svg?height=320&width=320"
                    alt="Profile Photo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="col-span-2">
                <h2 className="text-2xl font-semibold mb-6">{t("bio_title")}</h2>
                <div className="space-y-6 text-muted-foreground">
                  <p className="leading-relaxed">{t("bio")}</p>
                  <p className="leading-relaxed">{t("bio_extended")}</p>
                  <p className="leading-relaxed">{t("bio_additional")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
