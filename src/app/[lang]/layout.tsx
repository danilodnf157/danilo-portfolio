import type { Metadata } from 'next'

import type { I18nLangAsyncProps, I18nLangKeys } from '@/i18n'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { Footer, LastUpdated, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { CustomFooter } from '@/components/CustomFooter'
import { StructuredData } from '@/components/StructuredData'
import { useServerLocale } from '@/hooks'
import LocaleToggle from '@/widgets/locale-toggle'
import ThemeToggle from '@/widgets/theme-toggle'

import { getDictionary, getDirection } from '../_dictionaries/get-dictionary'
import { ThemeProvider } from './_components/ThemeProvider'
import './styles/index.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://antonio-s.vercel.app'),
  title: {
    default: 'Antonio Silva - Full Stack Software Engineer',
    template: '%s | Antonio Silva',
  },
  description: 'Full Stack Software Engineer especializado em React, Next.js, TypeScript e Node.js. Portfólio com projetos, experiência profissional e stack tecnológico.',
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Software Engineer',
    'Web Developer',
    'Portfolio',
    'Antonio Silva',
  ],
  authors: [{ name: 'Antonio Silva', url: 'https://antonio-s.vercel.app' }],
  creator: 'Antonio Silva',
  publisher: 'Antonio Silva',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/img/favicon.svg',
    shortcut: '/img/favicon.svg',
    apple: '/img/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://antonio-s.vercel.app',
    siteName: 'Danilo Nascimento - Portfolio',
    title: 'Antonio Silva - Full Stack Software Engineer',
    description: 'Full Stack Software Engineer especializado em React, Next.js, TypeScript e Node.js.',
    images: [
      {
        url: '/img/photo.png',
        width: 1200,
        height: 630,
        alt: 'Antonio Silva - Full Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antonio Silva - Full Stack Software Engineer',
    description: 'Full Stack Software Engineer especializado em React, Next.js, TypeScript e Node.js.',
    images: ['/img/photo.png'],
    creator: '@tony-silva',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://antonio-s.vercel.app',
    languages: {
      'pt-BR': 'https://antonio-s.vercel.app/pt-BR',
      'en': 'https://antonio-s.vercel.app/en',
      'zh': 'https://antonio-s.vercel.app/zh',
    },
  },
}

const repo = 'https://github.com/Tonybsilva-dev/antonio-s'

const CustomBanner = async ({ lang }: I18nLangAsyncProps) => {
  const { t } = await useServerLocale(lang)
  return (
    <Banner
      storageKey="starter-banner"
    >
      <div className="flex justify-center items-center gap-1">
        { t('banner.title') }
        {' '}
        <a
          className="max-sm:hidden text-warning hover:underline"
          target="_blank"
          href={repo}
          rel="noopener noreferrer"
          title="Visitar repositório no GitHub"
        >
          { t('banner.more') }
        </a>
      </div>
    </Banner>
  )
}


const CustomNavbar = async ({ lang }: I18nLangAsyncProps) => {
  const { t } = await useServerLocale(lang)
  return (
    <Navbar
      logo={(
        <span>{ t('systemTitle') }</span>
      )}
      logoLink={`/${lang}`}
      projectLink={repo}
    >
      <>
        <LocaleToggle className="max-md:hidden" />
        <ThemeToggle className="max-md:hidden" />
      </>

    </Navbar>
  )
}


// interface Props {
//   children: ReactNode
//   params: Promise<{ lang: I18nLangKeys }>
// }

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const getterParams = await params

  const { lang } = getterParams as { lang: I18nLangKeys }

  const dictionary = await getDictionary(lang)
  const pageMap = await getPageMap(lang)

  const title = 'Antonio Silva'
  const description = 'Engenheiro de Software Full Stack'

  const { t } = await useServerLocale(lang)

  return (
    <html
      // Not required, but good for SEO
      lang={lang}
      // Required to be set
      // dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      dir={getDirection(lang)}
      suppressHydrationWarning
    >
      <Head>
        <StructuredData lang={lang} />
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </Head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="starter-theme-provider"
          disableTransitionOnChange
        >
          <Layout
            navbar={
              <CustomNavbar lang={lang} />
            }
            lastUpdated={(
              <LastUpdated>
                { t('lastUpdated') }
              </LastUpdated>
            )}
            editLink={null}
            docsRepositoryBase="https://github.com/Tonybsilva-dev/antonio-s"
            // footer={(
            //   <Footer className="bg-background py-5!">
            //     <CustomFooter />
            //   </Footer>
            // )}
            search={(
              <Search
                placeholder={t('search.placeholder')}
                emptyResult={t('search.noResults')}
                errorText={t('search.errorText')}
                loading={t('search.loading')}
              />
            )}
            i18n={[
              { locale: 'en', name: 'English' },
              { locale: 'pt-BR', name: 'Português (BR)' },
              { locale: 'zh', name: '简体中文' },
            ]}
            toc={{
              backToTop: t('backToTop'),
              title: t('pageTitle'),
            }}
            pageMap={pageMap}
            feedback={{ content: '' }}
          // ... Your additional layout options
          >
            {children}
          </Layout>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-EKW6G1FNN1" />
      <Analytics />
    </html>
  )
}
