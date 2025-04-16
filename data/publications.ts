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
  {
    title: "PLACE holder :D",
    authors: "Smith, J., Anderson, L.",
    book: "Climate Change and Terrestrial Ecosystems",
    editors: "Roberts, M., Chen, W.",
    publisher: "Academic Press, London",
    pages: "123-145",
    year: 2022,
    link: "https://example.com/bookchapter1",
    googleScholarId: "GHI789",
  },
]

export const conferences: Conference[] = [
  {
    title: "This is not real, is a palce holder",
    authors: "Smith, J., Davis, R.",
    conference: "International Conference on Ecology and Conservation",
    location: "Barcelona, Spain",
    date: "June 15-18, 2023",
    link: "https://example.com/conference1",
    googleScholarId: "JKL012",
  },
]

// Helper function to get recent publications
export function getRecentPublications(count = 2) {
  return publications.slice(0, count)
}
