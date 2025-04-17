export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  date: string
  author: string
  readingTime: number
  coverImage: string
  categories: string[]
  tags: string[]
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: "climate-change-impacts-forest-ecosystems",
    title: "Climate Change Impacts on Forest Ecosystems",
    description:
      "An overview of how climate change is affecting forest ecosystems globally and what it means for biodiversity.",
    content: `
# Climate Change Impacts on Forest Ecosystems

Climate change is rapidly altering forest ecosystems worldwide. As temperatures rise and precipitation patterns shift, forests face unprecedented challenges.

## Temperature Effects

Rising temperatures affect tree growth, reproduction, and survival. Many species are experiencing:

- Altered phenology (timing of life cycle events)
- Increased water stress
- Greater vulnerability to pests and diseases

## Precipitation Changes

Changes in precipitation patterns are equally concerning:

- Increased drought frequency in some regions
- Flooding and soil erosion in others
- Altered snow melt timing affecting seasonal water availability

## Biodiversity Implications

These changes have cascading effects on biodiversity:

1. Species range shifts
2. Disrupted ecological relationships
3. Potential local extinctions

## Research Directions

Our research focuses on understanding these dynamics through:

- Long-term monitoring plots
- Experimental manipulations
- Modeling future scenarios

![Forest Research](/placeholder.svg?height=400&width=600)

> "Understanding forest responses to climate change is essential for developing effective conservation strategies." - Dr. Jane Smith

## Conclusion

As we continue to gather data and refine our understanding, it's clear that forest conservation strategies must adapt to account for ongoing and future climate change impacts.

### References

1. IPCC. (2022). Climate Change 2022: Impacts, Adaptation and Vulnerability.
2. Smith, J. et al. (2023). Climate-driven shifts in forest composition across temperate regions. Journal of Ecology, 111(3), 567-582.
    `,
    date: "2023-11-15",
    author: "Dr. Jane Smith",
    readingTime: 8,
    coverImage: "/placeholder.svg?height=600&width=1200",
    categories: ["Research", "Climate Change"],
    tags: ["forests", "climate change", "biodiversity", "conservation"],
    featured: true,
  },
  {
    slug: "field-notes-cascade-mountains",
    title: "Field Notes: Summer Research in the Cascade Mountains",
    description: "Personal reflections and observations from three weeks of fieldwork in the Cascade Mountain range.",
    content: `
# Field Notes: Summer Research in the Cascade Mountains

This summer, our research team spent three weeks collecting data in the Cascade Mountains. Here are some observations and reflections from our time in the field.

## Research Sites

We established monitoring plots at three elevations:

1. **Lower montane forest** (800-1200m)
2. **Mid-elevation mixed forest** (1200-1600m)
3. **Subalpine zone** (1600-2000m)

## Biodiversity Patterns

One of the most striking observations was the variation in understory plant diversity across elevations:

| Elevation Zone | Species Richness | Dominant Species |
|----------------|------------------|------------------|
| Lower montane  | 45 species       | Sword fern, Oregon grape |
| Mid-elevation  | 38 species       | Huckleberry, beargrass |
| Subalpine      | 27 species       | Heather, mountain lupine |

## Climate Monitoring

We installed climate sensors at each site to track:

- Temperature (air and soil)
- Relative humidity
- Soil moisture
- Light availability

![Field Equipment](/placeholder.svg?height=400&width=600)

## Wildlife Encounters

The field season included numerous wildlife sightings:

- Black bears (from a safe distance!)
- Mule deer
- Northern spotted owl
- Various small mammals and amphibians

## Challenges and Lessons

Fieldwork always comes with challenges:

- Equipment malfunctions during heavy rain
- Difficult terrain limiting site accessibility
- The eternal battle against mosquitoes

## Next Steps

Our team is now processing samples and analyzing data. Preliminary results suggest significant differences in soil microbial communities across elevations, which may have implications for forest resilience to climate change.

> Field research reminds us of the complexity of natural systems and the importance of direct observation.

Looking forward to returning next season to continue this important work!
    `,
    date: "2023-08-22",
    author: "Dr. Jane Smith",
    readingTime: 6,
    coverImage: "/placeholder.svg?height=600&width=1200",
    categories: ["Fieldwork", "Research"],
    tags: ["Cascade Mountains", "biodiversity", "field research", "ecology"],
    featured: false,
  },
  {
    slug: "citizen-science-forest-monitoring",
    title: "Engaging Communities in Citizen Science for Forest Monitoring",
    description:
      "How citizen science programs are helping track forest health and biodiversity while engaging local communities.",
    content: `
# Engaging Communities in Citizen Science for Forest Monitoring

Citizen science has emerged as a powerful approach for collecting ecological data while simultaneously engaging the public in scientific research. In our forest monitoring work, we've developed several citizen science initiatives that are yielding valuable data and fostering environmental stewardship.

## The Power of Citizen Science

Citizen science offers multiple benefits:

- Expands data collection capacity beyond what professional scientists can accomplish alone
- Creates educational opportunities for participants
- Builds public support for conservation
- Connects people with their local ecosystems

## Our Forest Watch Program

The Forest Watch program engages volunteers in monitoring forest health indicators:

### Training Process

Participants receive training in:

1. Basic forest ecology
2. Species identification
3. Standardized monitoring protocols
4. Data recording and submission

### Monitoring Activities

Volunteers collect data on:

- Tree health and growth
- Presence of indicator species
- Signs of pests or diseases
- Phenology (timing of seasonal events)

![Citizen Scientists](/placeholder.svg?height=400&width=600)

## Data Quality and Management

A common concern with citizen science is data quality. We address this through:

- Thorough training and clear protocols
- Expert verification of unusual observations
- Quality control checks
- Appropriate statistical methods that account for observer variability

## Success Stories

Our citizen science programs have contributed to several research successes:

- Early detection of an invasive forest pathogen
- Documentation of shifting flowering times in response to climate change
- Creation of the most comprehensive biodiversity inventory for our region

## Getting Involved

If you're interested in participating in our citizen science programs:

- Visit our website to find projects in your area
- Attend an upcoming training session
- Download our mobile app for easy data submission
- Join our online community forum

> "The observations of dedicated citizen scientists have become an invaluable component of our research program." - Dr. Jane Smith

Citizen science represents a win-win approach that advances scientific knowledge while fostering public engagement with nature and conservation.
    `,
    date: "2023-06-10",
    author: "Dr. Jane Smith",
    readingTime: 7,
    coverImage: "/placeholder.svg?height=600&width=1200",
    categories: ["Outreach", "Conservation"],
    tags: ["citizen science", "community engagement", "forest monitoring", "conservation"],
    featured: true,
  },
]

// Helper functions
export function getAllPosts() {
  return blogPosts
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getFeaturedPosts() {
  return blogPosts.filter((post) => post.featured)
}

export function getRecentPosts(count = 3) {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count)
}

export function getAllCategories() {
  const categories = new Set<string>()
  blogPosts.forEach((post) => {
    post.categories.forEach((category) => {
      categories.add(category)
    })
  })
  return Array.from(categories)
}

export function getAllTags() {
  const tags = new Set<string>()
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags.add(tag)
    })
  })
  return Array.from(tags)
}

export function getPostsByCategory(category: string) {
  return blogPosts.filter((post) => post.categories.some((cat) => cat.toLowerCase() === category.toLowerCase()))
}

export function getPostsByTag(tag: string) {
  return blogPosts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}
