// Publications data file - update information here only

export interface Publication {
  title: string
  authors: string
  journal: string
  volume: string
  pages: string
  year: number
  doi: string
  link: string
  googleScholarId?: string
  orcidId?: string
}

export interface BookChapter {
  title: string
  authors: string
  book: string
  editors: string
  publisher: string
  pages: string
  year: number
  link: string
  googleScholarId?: string
  orcidId?: string
}

export interface Conference {
  title: string
  authors: string
  conference: string
  location: string
  date: string
  link: string
  googleScholarId?: string
  orcidId?: string
}

export const publications: Publication[] = [
  {
    title: "An appraisal of the protection conferred by foliar Epichloë endophytes against root herbivores in plants: A meta-analysis",
    authors: "Decunta, F.A., Gundel, P.E., Bastías, D.A.",
    journal: "Fungal Biology Reviews",
    volume: "52",
    pages: "100428",
    year: 2025,
    doi: "10.1016/j.fbr.2025.100428",
    link: "https://doi.org/10.1016/j.fbr.2025.100428",
  },
  {
    title: "Foliar phosphorus concentration modulates the defensive mutualism of an endophytic fungus in a perennial host grass",
    authors: "Decunta, F.A., Pérez, L.I., Graff, P., Gundel, P.E.",
    journal: "Functional Ecology",
    volume: "38(9)",
    pages: "2041-2053",
    year: 2024,
    doi: "10.1111/1365-2435.14616",
    link: "https://doi.org/10.1111/1365-2435.14616",
  },
  {
    title: "A Systematic Review on the Effects of Epichloë Fungal Endophytes on Drought Tolerance in Cool-Season Grasses",
    authors: "Decunta, F.A., Pérez, L.I., Malinowski, D.P., Molina-Montenegro, M.A., Gundel, P.E.",
    journal: "Frontiers in Plant Science",
    volume: "12",
    pages: "644731",
    year: 2021,
    doi: "10.3389/fpls.2021.644731",
    link: "https://doi.org/10.3389/fpls.2021.644731",
  },
]

export const bookChapters: BookChapter[] = [
]

export const conferences: Conference[] = [
  {
    title: "Rol del fósforo sobre la defensa anti-herbivoría provista por hongos endófitos.",
    authors: "Decunta, Facundo Alcides; Graff, Pamela; Pérez, Ignacio; Gundel, Pedro Emilio",
    conference: "Reunion Argentina de Ecología XXIX",
    location: "Tucumán, Argentina",
    date: "2021",
    link: "",
  },
  {
    title: "Eficiencia de Remoción de N en un Humedal Artificial de Flujo Vertical a Escala de Laboratorio.",
    authors: "Arakaki, Nicolas Kenji; Arreghini, Silvana; Serafini, Roberto; Weigandt, Cristian; Auguet, Silvana; Arnedillo, Gonzalo, Decunta, Facundo Alcides; Iorio, Alicia Fabricio de.",
    conference: "Congreso Aguas, Ambiente y Energías 2017. Asociación de Universidades Grupo Montevideo y Universidad de Cuyo",
    location: "Mendoza, Argentina",
    date: "2017",
    link: "",
  },
  {
    title: "Rol de los humedales en el ciclado del Nitrógeno.",
    authors: "Arakaki, Nicolas Kenji; Arreghini, Silvana; Serafini, Roberto; Auguet, Silvana; Arnedillo, Gonzalo, Decunta, Facundo Alcides; Iorio, Alicia Fabricio de.",
    conference: "IX Congreso de Ecología y Manejo de Ecosistemas Acuáticos Pampeanos",
    location: "La Plata, Argentina",
    date: "2017",
    link: "",
  },
]

// Helper function to get recent publications
export function getRecentPublications(count = 2) {
  return publications.slice(0, count)
}
