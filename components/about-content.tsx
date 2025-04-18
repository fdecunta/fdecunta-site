"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function AboutContent() {
  const { t } = useLanguage()

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="pt-12 pb-6">
        <div className="container-narrow">
          <h1 className="text-3xl font-medium">{t("about_me")}</h1>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="container-medium">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="sticky top-24">
                <div className="relative">
                  <Image
                    src="/me.png"
                    alt="Profile Photo"
                    width={400}
                    height={400}
                    className="object-cover aspect-square rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="prose max-w-none">
                <h2 className="text-xl font-medium mb-6">{t("bio_title")}</h2>
                <div className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{t("bio")}</p>
                  <p className="text-muted-foreground leading-relaxed">{t("bio_extended")}</p>
                  <p className="text-muted-foreground leading-relaxed">{t("bio_additional")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
