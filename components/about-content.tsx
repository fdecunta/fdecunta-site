"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function AboutContent() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Header */}
      <section className="py-12 border-b">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-medium">{t("about_me")}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Profile Photo"
                    width={400}
                    height={400}
                    className="object-cover aspect-square"
                    priority
                  />
                </div>
              </div>
              <div className="md:col-span-8">
                <div className="prose max-w-none">
                  <h2 className="text-xl font-medium mb-6">{t("bio_title")}</h2>
                  <div className="space-y-6">
                    <p className="text-mono-600 leading-relaxed">{t("bio")}</p>
                    <p className="text-mono-600 leading-relaxed">{t("bio_extended")}</p>
                    <p className="text-mono-600 leading-relaxed">{t("bio_additional")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
