import { MetadataRoute } from 'next'

const baseUrl = 'https://antonio-s.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/_pagefind/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

