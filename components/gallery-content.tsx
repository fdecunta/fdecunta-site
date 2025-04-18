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
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [initialDistance, setInitialDistance] = useState<number | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Function to open the image dialog
  const openImageDialog = (image: GalleryImage) => {
    setSelectedImage(image)
    setIsDialogOpen(true)
    setZoomLevel(1) // Reset zoom level when opening a new image
    setPosition({ x: 0, y: 0 }) // Reset position
  }

  // Function to close the image dialog
  const closeImageDialog = () => {
    setIsDialogOpen(false)
    setZoomLevel(1) // Reset zoom level when closing
    setPosition({ x: 0, y: 0 }) // Reset position
  }

  // Function to increase zoom
  const zoomIn = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.min(prev + 0.5, 5) // Max zoom 5x, larger increments
      return newZoom
    })
  }

  // Function to decrease zoom
  const zoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.5, 1) // Min zoom 1x, won't go smaller than original
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 }) // Reset position when fully zoomed out
      }
      return newZoom
    })
  }

  // Function to reset zoom
  const resetZoom = () => {
    setZoomLevel(1)
    setPosition({ x: 0, y: 0 }) // Reset position
  }

  // Handle touch start for pinch zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Calculate initial distance between two fingers
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
      setInitialDistance(distance)
    } else if (e.touches.length === 1 && zoomLevel > 1) {
      // Start dragging with one finger if zoomed in
      setIsDragging(true)
      setStartPosition({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  // Handle touch move for pinch zoom
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance !== null) {
      // Prevent default to stop page scrolling
      e.preventDefault()

      // Calculate new distance
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)

      // Calculate new zoom level based on finger distance change
      const scale = distance / initialDistance
      const newZoomLevel = Math.max(1, Math.min(5, zoomLevel * scale))

      setZoomLevel(newZoomLevel)
      setInitialDistance(distance)
    } else if (e.touches.length === 1 && isDragging) {
      // Handle dragging with one finger
      e.preventDefault()
      const newX = e.touches[0].clientX - startPosition.x
      const newY = e.touches[0].clientY - startPosition.y

      setPosition({ x: newX, y: newY })
    }
  }

  // Handle touch end
  const handleTouchEnd = () => {
    setInitialDistance(null)
    setIsDragging(false)
  }

  // Handle mouse down for drag on desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  // Handle mouse move for drag on desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - startPosition.x
      const newY = e.clientY - startPosition.y
      setPosition({ x: newX, y: newY })
    }
  }

  // Handle mouse up for drag on desktop
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle wheel event for mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      // Zoom in on scroll up
      setZoomLevel((prev) => Math.min(prev + 0.25, 5))
    } else {
      // Zoom out on scroll down
      setZoomLevel((prev) => {
        const newZoom = Math.max(prev - 0.25, 1)
        if (newZoom === 1) {
          setPosition({ x: 0, y: 0 }) // Reset position when fully zoomed out
        }
        return newZoom
      })
    }
  }

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
        <div className="container-wide">
          <SimpleTabs
            tabs={[{ label: t("gallery.researchTab"), value: "research" }, { label: t("gallery.personalTab"), value: "personal" }]}
          >
            <div data-label="research" className="mt-6">
              {/* Research images grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {researchImages.map((image, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openImageDialog(image)}
                  >
                    <CardContent className="p-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <div className="font-semibold text-lg mb-1">{image.title}</div>
                        <div className="text-muted-foreground text-sm mb-2">{image.location}</div>
                        <div className="text-sm">{image.description}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div data-label="personal" className="mt-6">
              {/* Personal images grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personalImages.map((image, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openImageDialog(image)}
                  >
                    <CardContent className="p-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <div className="font-semibold text-lg mb-1">{image.title}</div>
                        <div className="text-muted-foreground text-sm mb-2">{image.location}</div>
                        <div className="text-sm">{image.description}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </SimpleTabs>
        </div>
      </section>

      {/* Image Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className={cn(
            "max-w-[95vw] w-auto h-auto max-h-[95vh] p-0 overflow-hidden bg-black border-none",
            isMobile ? "sm:max-w-[95vw]" : "sm:max-  p-0 overflow-hidden bg-black border-none",
            isMobile ? "sm:max-w-[95vw]" : "sm:max-w-[85vw]",
          )}
        >
          <div className="relative w-full h-full flex flex-col">
            {/* Image container */}
            <div
              ref={imageContainerRef}
              className="relative flex-1 overflow-hidden p-0 flex items-center justify-center touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              style={{
                cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              }}
            >
              {selectedImage && (
                <div
                  className="transition-transform duration-100 ease-out"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                    transformOrigin: "center",
                    willChange: "transform",
                  }}
                >
                  <Image
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    width={1200}
                    height={800}
                    quality={90}
                    priority
                    className="object-contain max-h-[80vh] max-w-full"
                    unoptimized={true} // For better quality when zooming
                  />
                </div>
              )}

              {/* Mobile zoom instructions */}
              {isMobile && zoomLevel === 1 && (
                <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black bg-opacity-50 py-2 px-4 rounded-md mx-auto w-max">
                  Pinch to zoom
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="bg-background p-4 flex justify-between items-center">
              <div className="hidden sm:block">
                {selectedImage && (
                  <div>
                    <h3 className="font-medium text-lg text-foreground">{selectedImage.title}</h3>
                    <p className="text-muted-foreground text-sm">{selectedImage.location}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mx-auto sm:mx-0">
                <Button variant="outline" size="icon" onClick={zoomOut} disabled={zoomLevel <= 1} className="h-9 w-9">
                  <ZoomOut className="h-5 w-5" />
                  <span className="sr-only">Zoom out</span>
                </Button>
                <div className="px-2 min-w-[3rem] text-center">{Math.round(zoomLevel * 100)}%</div>
                <Button variant="outline" size="icon" onClick={zoomIn} disabled={zoomLevel >= 5} className="h-9 w-9">
                  <ZoomIn className="h-5 w-5" />
                  <span className="sr-only">Zoom in</span>
                </Button>
                <Button variant="outline" size="icon" onClick={resetZoom} className="h-9 w-9 ml-2">
                  <Maximize2 className="h-5 w-5" />
                  <span className="sr-only">Reset zoom</span>
                </Button>
                <Button variant="outline" size="icon" onClick={closeImageDialog} className="h-9 w-9 ml-2">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
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
