"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"
import { ZoomIn, ZoomOut, X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

// Minimal Tabs implementation
function SimpleTabs({ tabs, children }: { tabs: { label: string; value: string }[]; children: React.ReactNode }) {
  const [active, setActive] = useState(tabs[0].value);
  return (
    <div className="w-full">
      <div className="w-full flex justify-center mb-8 bg-transparent border-b rounded-none">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`px-4 py-2 text-lg focus:outline-none ${active === tab.value ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            onClick={() => setActive(tab.value)}
            aria-selected={active === tab.value}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && typeof child.props["data-label"] === "string") {
            return child.props["data-label"] === active ? React.cloneElement(child) : null;
          }
          return null;
        })}
      </div>
    </div>
  );
}


export function GalleryContent() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Open image dialog
  const openImageDialog = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  // Close image dialog
  const closeImageDialog = () => {
    setIsDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="pt-12 pb-6">
        <div className="container-narrow">
          <h1 className="text-3xl font-medium">{t("gallery")}</h1>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="container-medium">
          <SimpleTabs
            tabs={[
              { label: t("research_photos"), value: "research" },
              { label: t("personal_photos"), value: "personal" },
            ]}
          >
            <div data-label="research">
              {/* Gallery grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {researchImages.map((img, idx) => (
                  <Card key={idx} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openImageDialog(img)}>
                    <CardContent className="p-0">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={600}
                        height={400}
                        className="object-cover w-full h-48"
                        unoptimized={true}
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-base mb-1">{img.title}</h3>
                        <p className="text-muted-foreground text-xs">{img.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div data-label="personal">
              {/* Gallery grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {personalImages.map((img, idx) => (
                  <Card key={idx} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openImageDialog(img)}>
                    <CardContent className="p-0">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={600}
                        height={400}
                        className="object-cover w-full h-48"
                        unoptimized={true}
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-base mb-1">{img.title}</h3>
                        <p className="text-muted-foreground text-xs">{img.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </SimpleTabs>
        </div>
      </section>

      {/* Dialog for viewing image */}
      {selectedImage && (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setSelectedImage(null);
        }}>
          <DialogContent>
            <div className="flex flex-col items-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={900}
                height={600}
                className="object-contain max-h-[70vh] w-auto"
                unoptimized={true}
              />
              <h3 className="font-medium text-lg mt-4 mb-1">{selectedImage.title}</h3>
              <p className="text-muted-foreground text-sm mb-2">{selectedImage.location}</p>
              <p className="text-sm mb-4 text-center">{selectedImage.description}</p>
              <Button variant="outline" onClick={closeImageDialog}>
                {t("close")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

const researchImages = [
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Forest ecosystem research",
    title: "Forest Ecosystem Study",
    location: "Pacific Northwest, USA",
    description: "Collecting data on tree growth patterns in old-growth forests.",
  },
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Field sampling",
    title: "Soil Sampling",
    location: "Cascade Mountains, Washington",
    description: "Analyzing soil microbial communities in different forest types.",
  },
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Research team",
    title: "Research Team",
    location: "Field Station, Oregon",
    description: "Our research team setting up long-term monitoring plots.",
  },
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Drone mapping",
    title: "Drone Mapping",
    location: "Olympic National Park",
    description: "Using drones to map forest canopy structure.",
  },
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Lab work",
    title: "Laboratory Analysis",
    location: "University Research Lab",
    description: "Processing leaf samples for biochemical analysis.",
  },
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Conference presentation",
    title: "Conference Presentation",
    location: "International Ecology Conference, Barcelona",
    description: "Presenting research findings at the annual ecology conference.",
  },
]

const personalImages = [
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Hiking",
    title: "Weekend Hike",
    location: "Mount Rainier, Washington",
    description: "Exploring alpine meadows during summer bloom.",
  },
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Kayaking",
    title: "Kayaking Adventure",
    location: "Puget Sound, Washington",
    description: "Weekend kayaking trip with friends.",
  },
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Bird watching",
    title: "Bird Watching",
    location: "Skagit Valley, Washington",
    description: "Observing migratory birds during spring migration.",
  },
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Garden",
    title: "Home Garden",
    location: "Backyard",
    description: "My native plant garden that attracts local pollinators.",
  },
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Dog hiking",
    title: "Hiking with Luna",
    location: "Olympic Peninsula",
    description: "Weekend adventures with my dog Luna.",
  },
  {
    src: "/placeholder.svg?height=1200&width=1600",
    alt: "Photography",
    title: "Nature Photography",
    location: "Various Locations",
    description: "Capturing the beauty of natural landscapes.",
  },
]
