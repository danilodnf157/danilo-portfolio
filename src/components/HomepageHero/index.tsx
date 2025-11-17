'use client'

import { useTheme } from 'nextra-theme-docs'
import { useMemo } from 'react'
import Marquee from 'react-fast-marquee'
import { PanelParticles } from '@/components/PanelParticles'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import { useLocale } from '@/hooks'
import { cn } from '@/lib/utils'
import { Section } from './Section'
import { SetupHero } from './Setup'

interface FeatureItem {
  title: string
  description: string
}

interface FaqItem {
  question: string
  answer: string
}

export const StackItem = ({
  className,
}: {
  className: string
},
) => {
  return (
    <div className={cn(
      'mx-6 size-[50px]',
      'text-neutral-800 dark:text-neutral-100',
      'transition-all duration-300 transform opacity-75',
      'hover:scale-125 hover:opacity-100',
      className,
    )}
    >
    </div>
  )
}

export default function HomepageHero() {
  const { t } = useLocale()

  const featureList = t('featureList') as FeatureItem[]
  const faqs = t('faqs') as FaqItem[]

  const { resolvedTheme: _resolvedTheme } = useTheme()

  const processedFeatureList = useMemo(() => {
    const icons = [
      'icon-[material-symbols--rocket-launch-outline]',
      'icon-[icon-park-outline--international]',
      'icon-[nonicons--typescript-16]',
      'icon-[carbon--face-satisfied] hover:icon-[carbon--face-wink]',
      'icon-[teenyicons--tailwind-outline]',
      'icon-[tabler--calendar-code]',
      'icon-[carbon--color-palette]',
      'icon-[carbon--ibm-cloud-transit-gateway]',
      'icon-[carbon--flash]',
    ]
    return featureList.map((item, index) => {
      return {
        ...item,
        icon: <span className={icons[index] || icons[0]}></span>,
      }
    })
  }, [featureList])

  return (
    <>
      <PanelParticles />
      <SetupHero />
      {/* <div className="relative top-[-18px] mb-[-10px] flex justify-center py-[0px] z-2">
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[150px] h-[40px] flex flex-col items-center gap-[20px]"
        >
          <img
            className="dark:invert"
            src="/next.svg"
            style={{ width: '100%', height: 'auto' }}
          />
        </a>
      </div> */}
      <div className="relative z-1 pb-10 md:pb-[100px]">
        <Section
          title="Tech Stack"
          titleProps={{
            disabledAnimation: false,
          }}
        >
          <div className="flex flex-col gap-4 items-center w-full max-w-7xl my-[30px]">
            <div className="flex justify-center w-full h-[80px]">
              <Marquee
                pauseOnHover
                autoFill
                gradient
                direction="right"
                gradientColor="var(--background)"
                speed={60}
              >
                {/* Frontend */}
                <StackItem className="icon-[simple-icons--javascript]" />
                <StackItem className="icon-[simple-icons--typescript]" />
                <StackItem className="icon-[simple-icons--react]" />
                <StackItem className="icon-[simple-icons--nextdotjs]" />
                <StackItem className="icon-[simple-icons--mdx]" />
                <StackItem className="icon-[simple-icons--nodedotjs]" />
                <StackItem className="icon-[simple-icons--astro]" />
                <StackItem className="icon-[simple-icons--tailwindcss]" />
                <StackItem className="icon-[simple-icons--sass]" />
                <StackItem className="icon-[simple-icons--shadcnui]" />
                <StackItem className="icon-[simple-icons--nextra]" />
                <StackItem className="icon-[teenyicons--framer-outline]" />
              </Marquee>
            </div>
            <div className="flex justify-center w-full h-[80px]">
              <Marquee
                pauseOnHover
                autoFill
                gradient
                direction="left"
                gradientColor="var(--background)"
                speed={60}
              >
                {/* Build & Test */}
                <StackItem className="icon-[simple-icons--vite]" />
                <StackItem className="icon-[simple-icons--turborepo]" />
                <StackItem className="icon-[simple-icons--nx]" />
                <StackItem className="icon-[simple-icons--vitest]" />
                <StackItem className="icon-[simple-icons--storybook]" />
                <StackItem className="icon-[simple-icons--chromatic]" />
                <StackItem className="icon-[simple-icons--cypress]" />
                <StackItem className="icon-[simple-icons--playwright]" />
                {/* Qualidade */}
                <StackItem className="icon-[simple-icons--eslint]" />
                <StackItem className="icon-[simple-icons--prettier]" />
                <StackItem className="icon-[simple-icons--sonarqube]" />
                {/* Serviços */}
                <StackItem className="icon-[simple-icons--stripe]" />
                {/* Banco de Dados */}
                <StackItem className="icon-[simple-icons--mysql]" />
                <StackItem className="icon-[simple-icons--postgresql]" />
                <StackItem className="icon-[simple-icons--mongodb]" />
                <StackItem className="icon-[simple-icons--redis]" />
                {/* Cloud/DevOps/CI-CD */}
                <StackItem className="icon-[simple-icons--amazonaws]" />
                <StackItem className="icon-[simple-icons--microsoftazure]" />
                <StackItem className="icon-[simple-icons--docker]" />
                <StackItem className="icon-[simple-icons--kubernetes]" />
                <StackItem className="icon-[simple-icons--github]" />
                <StackItem className="icon-[simple-icons--gitlab]" />
                <StackItem className="icon-[simple-icons--githubactions]" />
                {/* Observabilidade */}
                <StackItem className="icon-[simple-icons--sentry]" />
                <StackItem className="icon-[simple-icons--datadog]" />
              </Marquee>
            </div>
          </div>
        </Section>
        <Section
          title="Features"
          description={t('featuresDesc') as string}
        >
          <div className="flex justify-center w-full max-w-7xl">
            <HoverEffect items={processedFeatureList} />
          </div>
        </Section>
        <Section
          title={t('faqsTitle') as string}
          tallPaddingY
        >
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-5xl"
          >
            {
              faqs.map((faqItem, index) => (
                <AccordionItem
                  value={faqItem.question}
                  key={index}
                >
                  <AccordionTrigger>{faqItem.question}</AccordionTrigger>
                  <AccordionContent>
                    {faqItem.answer}
                  </AccordionContent>
                </AccordionItem>
              ))
            }
          </Accordion>
        </Section>
      </div>
    </>
  )
}
