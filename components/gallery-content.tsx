"use client"

import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"

export function GalleryContent() {
  const { t } = useLanguage()

  return (
    <div>
      {/* Header */}
      <section className="py-12 border-b">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-medium">{t("gallery")}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="research" className="w-full">
              <TabsList className="w-full flex justify-center mb-8 bg-transparent border-b">
                <TabsTrigger
                  value="research"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-mono-900 data-[state=active]:bg-transparent rounded-none px-6 py-2 bg-transparent text-mono-500 data-[state=active]:text-mono-900"
                >
                  {t("research_fieldwork")}
                </TabsTrigger>
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-mono-900 data-[state=active]:bg-transparent rounded-none px-6 py-2 bg-transparent text-mono-500 data-[state=active]:text-mono-900"
                >
                  {t("personal")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="research" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {researchImages.map((image, index) => (
                    <div key={index} className="border border-mono-200">
                      <div className="relative h-64 w-full">
                        <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg">{image.title}</h3>
                        <p className="text-mono-500 text-sm mt-1">{image.location}</p>
                        <p className="mt-2 text-mono-600 text-sm">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="personal" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {personalImages.map((image, index) => (
                    <div key={index} className="border border-mono-200">
                      <div className="relative h-64 w-full">
                        <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg">{image.title}</h3>
                        <p className="text-mono-500 text-sm mt-1">{image.location}</p>
                        <p className="mt-2 text-mono-600 text-sm">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}

const researchImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Forest ecosystem research",
    title: "Forest Ecosystem Study",
    location: "Pacific Northwest, USA",
    description: "Collecting data on tree growth patterns in old-growth forests.",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Field sampling",
    title: "Soil Sampling",
    location: "Cascade Mountains, Washington",
    description: "Analyzing soil microbial communities in different forest types.",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Research team",
    title: "Research Team",
    location: "Field Station, Oregon",
    description: "Our research team setting up long-term monitoring plots.",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Drone mapping",
    title: "Drone Mapping",
    location: "Olympic National Park",
    description: "Using drones to map forest canopy structure.",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Lab work",
    title: "Laboratory Analysis",
    location: "University Research Lab",
    description: "Processing leaf samples for biochemical analysis.",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Conference presentation",
    title: "Conference Presentation",
    location: "International Ecology Conference, Barcelona",
    description: "Presenting research findings at the annual ecology conference.",
  },
]

const personalImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Hiking",
    title: "Weekend Hike",
    location: "Mount Rainier, Washington",
    description: "Exploring alpine meadows during summer bloom.",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Kayaking",
    title: "Kayaking Adventure",
    location: "Puget Sound, Washington",
    description: "Weekend kayaking trip with friends.",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Bird watching",
    title: "Bird Watching",
    location: "Skagit Valley, Washington",
    description: "Observing migratory birds during spring migration.",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Garden",
    title: "Home Garden",
    location: "Backyard",
    description: "My native plant garden that attracts local pollinators.",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Dog hiking",
    title: "Hiking with Luna",
    location: "Olympic Peninsula",
    description: "Weekend adventures with my dog Luna.",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Photography",
    title: "Nature Photography",
    location: "Various Locations",
    description: "Capturing the beauty of natural landscapes.",
  },
]
