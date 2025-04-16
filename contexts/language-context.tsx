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
    dr_title: "Dr. Jane Smith",
    phd_title: "PhD in Ecology",
    short_intro: "Ecologist specializing in forest ecosystem dynamics and climate change impacts.",
    about_me: "About Me",
    view_publications: "Publications",
    photo_gallery: "Photo Gallery",
    recent_publications: "Recent Publications",
    read_more: "Read more →",
    view_all_publications: "View All Publications",

    // About page
    bio_title: "Biography",
    bio: "I am an ecologist specializing in forest ecosystem dynamics and climate change impacts. My research focuses on understanding how forest communities respond to environmental changes and developing conservation strategies for vulnerable ecosystems.",
    bio_extended:
      "With over 8 years of experience in ecological research, I have conducted fieldwork across diverse forest ecosystems in North America and Europe. My work combines traditional ecological methods with advanced remote sensing and data science approaches to understand complex ecosystem processes at multiple scales.",
    bio_additional:
      "I am passionate about communicating science to diverse audiences and engaging communities in conservation efforts. My research has been published in leading ecological journals and presented at international conferences. I collaborate with various conservation organizations and government agencies to translate research findings into practical conservation strategies. When not in the field or lab, I enjoy hiking, wildlife photography, and volunteering for local environmental education programs.",

    // Publications page
    journal_articles: "Journal Articles",
    book_chapters: "Book Chapters",
    conference_proceedings: "Conference Proceedings",
    view_publication: "View Publication",
    view_chapter: "View Chapter",
    view_proceedings: "View Proceedings",

    // Gallery page
    research_fieldwork: "Research & Fieldwork",
    personal: "Personal",

    // Contact information
    address: "Address",
    email: "Email",
    university: "University of Environmental Sciences",
    all_rights_reserved: "All rights reserved.",
  },
  es: {
    // Navigation
    home: "Inicio",
    about: "Sobre Mí",
    publications: "Publicaciones",
    gallery: "Galería",

    // Home page
    dr_title: "Dra. Jane Smith",
    phd_title: "Doctorado en Ecología",
    short_intro: "Ecóloga especializada en la dinámica de ecosistemas forestales y los impactos del cambio climático.",
    about_me: "Sobre Mí",
    view_publications: "Publicaciones",
    photo_gallery: "Galería de Fotos",
    recent_publications: "Publicaciones Recientes",
    read_more: "Leer más →",
    view_all_publications: "Ver Todas las Publicaciones",

    // About page
    bio_title: "Biografía",
    bio: "Soy ecóloga especializada en la dinámica de ecosistemas forestales y los impactos del cambio climático. Mi investigación se centra en comprender cómo las comunidades forestales responden a los cambios ambientales y en desarrollar estrategias de conservación para ecosistemas vulnerables.",
    bio_extended:
      "Con más de 8 años de experiencia en investigación ecológica, he realizado trabajo de campo en diversos ecosistemas forestales de América del Norte y Europa. Mi trabajo combina métodos ecológicos tradicionales con enfoques avanzados de teledetección y ciencia de datos para comprender procesos ecosistémicos complejos a múltiples escalas.",
    bio_additional:
      "Me apasiona comunicar la ciencia a diversas audiencias e involucrar a las comunidades en los esfuerzos de conservación. Mi investigación ha sido publicada en importantes revistas ecológicas y presentada en conferencias internacionales. Colaboro con varias organizaciones de conservación y agencias gubernamentales para traducir los resultados de la investigación en estrategias prácticas de conservación. Cuando no estoy en el campo o en el laboratorio, disfruto de caminatas, fotografía de vida silvestre y voluntariado en programas locales de educación ambiental.",

    // Publications page
    journal_articles: "Artículos de Revistas",
    book_chapters: "Capítulos de Libros",
    conference_proceedings: "Actas de Conferencias",
    view_publication: "Ver Publicación",
    view_chapter: "Ver Capítulo",
    view_proceedings: "Ver Actas",

    // Gallery page
    research_fieldwork: "Investigación y Trabajo de Campo",
    personal: "Personal",

    // Contact information
    address: "Dirección",
    email: "Correo Electrónico",
    university: "Universidad de Ciencias Ambientales",
    all_rights_reserved: "Todos los derechos reservados.",
  },
}
