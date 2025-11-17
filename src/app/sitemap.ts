import { MetadataRoute } from 'next'

const baseUrl = 'https://antonio-s.vercel.app'
const locales = ['pt-BR', 'en', 'zh']

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    'resume',
    'docs',
    'docs/projects',
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add main pages for each locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale === 'pt-BR' ? 'pt-BR' : locale}${route ? `/${route}` : ''}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [
              loc === 'pt-BR' ? 'pt-BR' : loc,
              `${baseUrl}/${loc === 'pt-BR' ? 'pt-BR' : loc}${route ? `/${route}` : ''}`,
            ]),
          ),
        },
      })
    })
  })

  return sitemapEntries
}

