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
    title: "Forest Ecosystem Responses to Climate Change",
    authors: "Smith, J., Anderson, L.",
    book: "Climate Change and Terrestrial Ecosystems",
    editors: "Roberts, M., Chen, W.",
    publisher: "Academic Press, London",
    pages: "123-145",
    year: 2022,
    link: "https://example.com/bookchapter1",
    googleScholarId: "GHI789",
    orcidId: "0000-0001-2345-6791",
  },
  {
    title: "Conservation Strategies for Vulnerable Forest Species",
    authors: "Smith, J., Miller, S., Thompson, J.",
    book: "Biodiversity Conservation in the Anthropocene",
    editors: "Wilson, A., Brown, D.",
    publisher: "Springer, New York",
    pages: "211-230",
    year: 2021,
    link: "https://example.com/bookchapter2",
    // No IDs for this publication
  },
]

export const conferences: Conference[] = [
  {
    title: "Monitoring forest biodiversity using remote sensing techniques",
    authors: "Smith, J., Davis, R.",
    conference: "International Conference on Ecology and Conservation",
    location: "Barcelona, Spain",
    date: "June 15-18, 2023",
    link: "https://example.com/conference1",
    googleScholarId: "JKL012",
  },
  {
    title: "Adaptive management approaches for forest conservation",
    authors: "Smith, J., Wilson, T., Brown, C.",
    conference: "Annual Meeting of the Ecological Society of America",
    location: "Portland, OR, USA",
    date: "August 7-12, 2022",
    link: "https://example.com/conference2",
    orcidId: "0000-0001-2345-6792",
  },
  {
    title: "Citizen science contributions to long-term ecological monitoring",
    authors: "Smith, J., Garcia, M.",
    conference: "European Congress of Conservation Biology",
    location: "Prague, Czech Republic",
    date: "September 3-6, 2021",
    link: "https://example.com/conference3",
    // No IDs for this publication
  },
]

// Helper function to get recent publications
export function getRecentPublications(count = 2) {
  return publications.slice(0, count)
}
