import { PublicationsContent } from "@/components/publications-content"

export default function Publications() {
  return <PublicationsContent />
}

const publications = [
  {
    title: "Climate-driven shifts in forest composition across temperate regions",
    authors: "Smith, J., Johnson, A., Williams, B.",
    journal: "Journal of Ecology",
    volume: "111(3), 567-582",
    pages: "567-582",
    year: 2023,
    doi: "10.1111/jec.13579",
    link: "https://example.com/publication1",
  },
  {
    title: "Long-term monitoring reveals biodiversity loss in protected areas",
    authors: "Smith, J., Brown, C., Davis, E.",
    journal: "Conservation Biology",
    volume: "36(2)",
    pages: "234-248",
    year: 2022,
    doi: "10.1111/cobi.13821",
    link: "https://example.com/publication2",
  },
  {
    title: "Ecological resilience of forest ecosystems under climate change",
    authors: "Smith, J., Garcia, M., Wilson, T.",
    journal: "Nature Ecology & Evolution",
    volume: "5(8)",
    pages: "1043-1052",
    year: 2021,
    doi: "10.1038/s41559-021-01485-1",
    link: "https://example.com/publication3",
  },
  {
    title: "Impacts of drought on understory plant communities in temperate forests",
    authors: "Smith, J., Taylor, R.",
    journal: "Plant Ecology",
    volume: "217(4)",
    pages: "401-413",
    year: 2020,
    doi: "10.1007/s11258-020-01018-z",
    link: "https://example.com/publication4",
  },
  {
    title: "Soil microbial diversity as an indicator of forest health",
    authors: "Johnson, K., Smith, J., Lee, P.",
    journal: "Soil Biology and Biochemistry",
    volume: "142",
    pages: "107-118",
    year: 2020,
    doi: "10.1016/j.soilbio.2019.12.008",
    link: "https://example.com/publication5",
  },
]

const bookChapters = [
  {
    title: "Forest Ecosystem Responses to Climate Change",
    authors: "Smith, J., Anderson, L.",
    book: "Climate Change and Terrestrial Ecosystems",
    editors: "Roberts, M., Chen, W.",
    publisher: "Academic Press, London",
    pages: "123-145",
    year: 2022,
    link: "https://example.com/bookchapter1",
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
  },
]

const conferences = [
  {
    title: "Monitoring forest biodiversity using remote sensing techniques",
    authors: "Smith, J., Davis, R.",
    conference: "International Conference on Ecology and Conservation",
    location: "Barcelona, Spain",
    date: "June 15-18, 2023",
    link: "https://example.com/conference1",
  },
  {
    title: "Adaptive management approaches for forest conservation",
    authors: "Smith, J., Wilson, T., Brown, C.",
    conference: "Annual Meeting of the Ecological Society of America",
    location: "Portland, OR, USA",
    date: "August 7-12, 2022",
    link: "https://example.com/conference2",
  },
  {
    title: "Citizen science contributions to long-term ecological monitoring",
    authors: "Smith, J., Garcia, M.",
    conference: "European Congress of Conservation Biology",
    location: "Prague, Czech Republic",
    date: "September 3-6, 2021",
    link: "https://example.com/conference3",
  },
]
