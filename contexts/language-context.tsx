"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Translations object
const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    publications: "Publications",
    gallery: "Gallery",

    // Home page
    dr_title: "Facundo Decunta",
    phd_title: "PhD candidate in Ecology",
    short_intro: "PhD candidate in Ecology specializing in plant interactions with symbiotic microorganisms and insect herbivores.",
    about_me: "About Me",
    view_publications: "Publications",
    photo_gallery: "Photo Gallery",
    recent_publications: "Recent Publications",
    read_more: "Read more →",
    view_all_publications: "View All Publications",

    // About page
    bio_title: "Biography",
    bio: "This should be my bio.",
    bio_extended:
      "This should be my extended bio!",
    bio_additional:
      "This is additioanl info about me or whatever.",

    // Publications page
    journal_articles: "Journal Articles",
    book_chapters: "Book Chapters",
    conference_proceedings: "Conference Proceedings",
    view_publication: "View Publication",
    view_chapter: "View Chapter",
    view_proceedings: "View Proceedings",

    // Gallery page
    research_fieldwork: "Research",
    personal: "Personal",

    // Contact information
    address: "Address",
    email: "Email",
    university: "Faculty of Agronomy, University of Buenos Aires",
    department: "Department of Quantitative Methods And Information Systems",
    all_rights_reserved: "All rights reserved.",
  },
  es: {
    // Navigation
    home: "Inicio",
    about: "Sobre Mí",
    publications: "Publicaciones",
    gallery: "Galería",

    // Home page
    dr_title: "Facundo Decunta",
    phd_title: "Estudiante doctoral en Ecología",
    short_intro: "Estudiante doctoral en ecología, especializado en las interacciones de las plantas con microorganismos simbióticos y herbívoros insectos",
    about_me: "Sobre Mí",
    view_publications: "Publicaciones",
    photo_gallery: "Galería de Fotos",
    recent_publications: "Publicaciones Recientes",
    read_more: "Leer más →",
    view_all_publications: "Ver Todas las Publicaciones",

    // About page
    bio_title: "Biografía",
    bio: "Mi bio.",
    bio_extended:
      "My bio extendidad.",
    bio_additional:
      "Mas cosas de mi o lo que sea.",

    // Publications page
    journal_articles: "Artículos",
    book_chapters: "Capítulos de Libros",
    conference_proceedings: "Congresos",
    view_publication: "Ver Publicación",
    view_chapter: "Ver Capítulo",
    view_proceedings: "Ver Actas",

    // Gallery page
    research_fieldwork: "Investigación",
    personal: "Personal",

    // Contact information
    address: "Dirección",
    email: "Correo Electrónico",
    university: "Facultad de Agronomía, Universidad de Buenos Aires",
    department: "Departamento de Métodos Cuantitativos y Sistemas de Información",
    all_rights_reserved: "Todos los derechos reservados.",
  },
}
