import { useServerLocale } from '@/hooks'

interface StructuredDataProps {
  lang: string
}

export async function StructuredData({ lang }: StructuredDataProps) {
  const { t } = await useServerLocale(lang as any)
  const baseUrl = 'https://antonio-s.vercel.app'

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Antonio Silva',
    jobTitle: 'Full Stack Software Engineer',
    url: baseUrl,
    sameAs: [
      'https://www.linkedin.com/in/tony-silva/',
      'https://github.com/Tonybsilva-dev',
    ],
    email: 'contato@antoniobsilva.com.br',
    image: `${baseUrl}/img/photo.png`,
    description: (t('banner.title' as any) as string) || 'Full Stack Software Engineer',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Antonio Silva - Portfolio',
    url: baseUrl,
    description: 'Portfolio de Antonio Silva - Full Stack Software Engineer',
    author: {
      '@type': 'Person',
      name: 'Antonio Silva',
    },
    inLanguage: ['pt-BR', 'en', 'zh'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

