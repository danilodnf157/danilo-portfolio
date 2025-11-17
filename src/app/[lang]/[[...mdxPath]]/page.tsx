import type { Metadata } from 'next'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '@/mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath, params.lang)
  const baseUrl = 'https://antonio-s.vercel.app'
  const lang = params.lang === 'pt-BR' ? 'pt-BR' : params.lang
  const path = params.mdxPath?.join('/') || ''
  const url = `${baseUrl}/${lang}${path ? `/${path}` : ''}`

  return {
    ...metadata,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${baseUrl}/pt-BR${path ? `/${path}` : ''}`,
        'en': `${baseUrl}/en${path ? `/${path}` : ''}`,
        'zh': `${baseUrl}/zh${path ? `/${path}` : ''}`,
      },
    },
    openGraph: {
      ...metadata.openGraph,
      url,
      locale: lang === 'pt-BR' ? 'pt_BR' : lang === 'zh' ? 'zh_CN' : 'en_US',
      siteName: 'Antonio Silva - Portfolio',
    },
    twitter: {
      ...metadata.twitter,
      card: 'summary_large_image',
    },
  }
}

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[]
    lang: string
  }>
}>
const Wrapper = useMDXComponents().wrapper

export default async function Page(props: PageProps) {
  const params = await props.params
  const result = await importPage(params.mdxPath, params.lang)
  const { default: MDXContent, toc, metadata, sourceCode } = result


  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
