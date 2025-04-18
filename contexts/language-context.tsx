"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // This will only run on the client side
    if (typeof window !== "undefined") {
      const browserLang = navigator.language.toLowerCase()
      return browserLang.startsWith("es") ? "es" : "en"
    }
    return "en" // Default to English on server-side
  })

  useEffect(() => {
    // Check if there's a stored language preference
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("preferredLanguage") as Language | null
      if (storedLanguage && (storedLanguage === "en" || storedLanguage === "es")) {
        setLanguage(storedLanguage)
      }
    }
  }, [])

  useEffect(() => {
    // Store language preference in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLanguage", language)
    }
  }, [language])

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
    short_intro: "Specializing in plant interactions with symbiotic microorganisms and insect herbivores, also interested in statistics and programming.",
    about_me: "About Me",
    view_publications: "Publications",
    photo_gallery: "Photo Gallery",
    recent_publications: "Recent Publications",
    read_more: "Read more →",
    view_all_publications: "View All Publications",

    // About page
    bio_title: "Bio",
    bio: "My name is Facundo Alcides Decunta. I am from Chivilcoy, a small town in Buenos Aires, Argentina. I studied Environmental Science at the University of Buenos Aires and graduated in 2021. That same year, I started my PhD program at the Faculty of Agronomy at the University of Buenos Aires.",
    bio_extended:
      `
## Research

I study how plants interact with symbiotic microorganisms and insect herbivores. My study model is the symbiosis between cool-season grasses and Epichloë endophytes, a well-known defensive mutualism. Currently, I study this symbiosis in the context of belowground herbivory.

## Teaching

I was an assistant teacher in the Ecology Department at the Faculty of Agronomy, University of Buenos Aires, from 2018 to 2022. After that, I moved to the Department of Quantitative Methods and Information Systems, where I have been ever since. I've been teaching students of Environmental Science and Agronomic Engineering their first Statistics course.


## Programming

I like to write small tools that I need or that I think would be nice to have, and also because it is fun.

Most of my useful coding is done in R, as it is the language we use for statistics in ecology. I mostly write R code for data analysis, but I have also worked a bit with R packages. I contributed to [orchaRd](https://github.com/daniel1noble/orchaRd/), a package used for meta-analysis, by writing a couple of functions for conducting and plotting leave-one-out analyses.

My other programming work is related to small personal projects. I like to write small tools for very specific problems, or just try to build something and see if it works. For this non-work programming, I usually use Python, but I have also done some C, Go, and written lots of small Bash scripts.


## Veganism

I am vegan. Many people can decide every day what to eat. Some food options require animals to suffer and be killed; some options don't. Whenever possible, choose the latter. Nobody should pay for a product that requires suffering and pain to be produced. Also, veganism is a win-win-win : it is good for your health, good for the environment, and good for the animals ([Tilman & Clark, 2014](https://doi.org/10.1038/nature13959); [Clark et al. 2018](https://doi.org/10.1038/nature13959); [Clark et al. 2019](https://doi.org/10.1038/nature13959); [Scherer et al. 2019](https://doi.org/10.1038/nature13959)).

`,
    bio_additional:
      "",

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
    university: "IFEVA - Faculty of Agronomy, University of Buenos Aires",
    department: "Department of Quantitative Methods And Information Systems",
    all_rights_reserved: "All rights reserved.",

    // Add to the en translations
    blog: "Blog",
    blog_title: "Blog",
    blog_description: "",
    read_post: "Read Post",
    published_on: "Published on",
    minutes_read: "min read",
    back_to_blog: "Back to Blog",
    categories: "Categories",
    tags: "Tags",
    recent_posts: "Recent Posts",
    no_posts: "No posts available yet.",
  },
  es: {
    // Navigation
    home: "Inicio",
    about: "Sobre Mí",
    publications: "Publicaciones",
    gallery: "Galería",

    // Home page
    dr_title: "Facundo Decunta",
    phd_title: "Estudiante de Doctorado",
    short_intro: "Enfocado en las interacciones entre plantas, microorganismos simbióticos y herbívoros insectos, con interés en la estadística y la programación",
    about_me: "Sobre Mí",
    view_publications: "Publicaciones",
    photo_gallery: "Galería de Fotos",
    recent_publications: "Publicaciones Recientes",
    read_more: "Leer más →",
    view_all_publications: "Ver Todas las Publicaciones",

    // About page
    bio_title: "Bio",
    bio: "Me llamo Facundo Alcides Decunta. Soy de Chivilcoy, un pueblo del interior de la provincia de Buenos Aires, Argentina. Estudié Ciencias Ambientales en la Universidad de Buenos Aires y me gradué en 2021. Ese mismo año, empecé el doctorado en la Facultad de Agronomía de la UBA.",
    bio_extended:
      `
## Investigación

Estudio cómo las plantas interactúan con microorganismos simbióticos y herbívoros insectos. Mi modelo de estudio es la simbiosis entre pastos y hongos endófitos del género _Epichloë_, un mutualismo defensivo bien conocido. Actualmente, estudio esta simbiosis en el contexto de la herbivoría subterránea.

## Docencia

Fui ayudante de cátedra en el Departamento de Ecología de la Facultad de Agronomía, Universidad de Buenos Aires, desde 2018 hasta 2022. Luego, me mudé al Departamento de Métodos Cuantitativos y Sistemas de Información, donde estoy desde entonces. He estado enseñando a estudiantes de Ciencias Ambientales e Ingeniería Agronómica su primer curso de Estadística.

## Programación

Me gusta escribir pequeñas herramientas que necesito o que creo que sería bueno tener, y también porque es divertido.

La mayor parte de mi programación útil la hago en R, porque es el lenguaje que usamos para análisis estadísticos en ecología. Principalmente escribo código en R para análisis de datos, pero también he trabajado un poco con paquetes de R. Contribuí a [orchaRd](https://github.com/daniel1noble/orchaRd/), un paquete utilizado para meta-análisis, escribiendo un par de funciones para realizar y graficar análisis leave-one-out.

Mi otro trabajo de programación está relacionado con pequeños proyectos personales. Me gusta escribir herramientas para problemas muy específicos, o simplemente intentar construir algo y ver si funciona. Para esta programación no laboral, usualmente uso Python, pero también he hecho algo de C, Go y he escrito muchos scripts pequeños en Bash.

## Veganismo

Soy vegano. Muchas personas pueden decidir qué comer. Algunas opciones alimenticias requieren que los animales sufran y sean sacrificados; otras no. Siempre que sea posible, elige la segunda opción. Nadie debería pagar por un producto que requiere sufrimiento y dolor para ser producido. Además, el veganismo es un win-win-win: es bueno para tu salud, bueno para el ambiente y bueno para los animales ([Tilman & Clark, 2014](https://doi.org/10.1038/nature13959); [Clark et al. 2018](https://doi.org/10.1038/nature13959); [Clark et al. 2019](https://doi.org/10.1038/nature13959); [Scherer et al. 2019](https://doi.org/10.1038/nature13959)).
`,
    bio_additional:
      "",

    // Publications page
    journal_articles: "Artículos de Revistas",
    book_chapters: "Capítulos de Libros",
    conference_proceedings: "Actas de Conferencias",
    view_publication: "Ver Publicación",
    view_chapter: "Ver Capítulo",
    view_proceedings: "Ver Actas",

    // Gallery page
    research_fieldwork: "Investigación",
    personal: "Personal",

    // Contact information
    address: "Dirección",
    email: "Correo Electrónico",
    university: "IFEVA - Facultad de Agronomía, Universidad de Buenos Aires",
    department: "Departamento de Métodos Cuantitativos y Sistemas de Información",
    all_rights_reserved: "Todos los derechos reservados.",

    // Add to the es translations
    blog: "Blog",
    blog_title: "Blog",
    blog_description: "",
    read_post: "Leer Publicación",
    published_on: "Publicado el",
    minutes_read: "min de lectura",
    back_to_blog: "Volver al Blog",
    categories: "Categorías",
    tags: "Etiquetas",
    recent_posts: "Publicaciones Recientes",
    no_posts: "Aún no hay publicaciones disponibles.",
  },
}
