"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"
import { ZoomIn, ZoomOut, X, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GalleryContent() {
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  // Function to open the image dialog
  const openImageDialog = (image: GalleryImage) => {
    setSelectedImage(image)
    setIsDialogOpen(true)
    setZoomLevel(1) // Reset zoom level when opening a new image
  }

  // Function to close the image dialog
  const closeImageDialog = () => {
    setIsDialogOpen(false)
    setZoomLevel(1) // Reset zoom level when closing
  }

  // Function to increase zoom
  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3)) // Max zoom 3x
  }

  // Function to decrease zoom
  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5)) // Min zoom 0.5x
  }

  // Function to reset zoom
  const resetZoom = () => {
    setZoomLevel(1)
  }

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
                    <div
                      key={index}
                      className="border border-mono-200 cursor-pointer"
                      onClick={() => openImageDialog(image)}
                    >
                      <div className="relative h-64 w-full group">
                        <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
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
                    <div
                      key={index}
                      className="border border-mono-200 cursor-pointer"
                      onClick={() => openImageDialog(image)}
                    >
                      <div className="relative h-64 w-full group">
                        <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
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

      {/* Image Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[90vw] w-auto h-auto max-h-[90vh] p-0 overflow-hidden bg-black border-none">
          <div className="relative w-full h-full flex flex-col">
            {/* Image container */}
            <div className="relative flex-1 overflow-auto p-4 flex items-center justify-center">
              {selectedImage && (
                <div
                  className="relative transition-transform duration-200 ease-in-out"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                >
                  <Image
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    width={800}
                    height={600}
                    className="object-contain max-h-[70vh]"
                  />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="bg-background p-4 flex justify-between items-center">
              <div>
                {selectedImage && (
                  <div>
                    <h3 className="font-medium text-lg text-foreground">{selectedImage.title}</h3>
                    <p className="text-muted-foreground text-sm">{selectedImage.location}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={zoomOut} disabled={zoomLevel <= 0.5} className="h-8 w-8">
                  <ZoomOut className="h-4 w-4" />
                  <span className="sr-only">Zoom out</span>
                </Button>
                <Button variant="outline" size="icon" onClick={resetZoom} className="h-8 w-8">
                  {zoomLevel !== 1 ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  <span className="sr-only">Reset zoom</span>
                </Button>
                <Button variant="outline" size="icon" onClick={zoomIn} disabled={zoomLevel >= 3} className="h-8 w-8">
                  <ZoomIn className="h-4 w-4" />
                  <span className="sr-only">Zoom in</span>
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 ml-2" onClick={closeImageDialog}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Type definition for gallery images
interface GalleryImage {
  src: string
  alt: string
  title: string
  location: string
  description: string
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
    src: "/images/gallery/argentina_champions.jpg?height=400&width=600",
    alt: "Argentina, 2022 World Cup champions.",
    title: "Argentina, 2022 World Cup champions.",
    location: "Plaza Irlanda, Buenos Aires, Argentina",
    description: "The best moment that ever happened",
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
