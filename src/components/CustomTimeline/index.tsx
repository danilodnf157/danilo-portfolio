'use client'

import React from 'react'
import { Timeline } from '@/components/ui/timeline'
import { useLocale } from '@/hooks/useLocale'

type MediaAltKeys = 'github' | 'beecrowd' | 'ecoleta' | 'devradar' | 'vicoa' | 'linkedin' | 'uiKit' | 'oi' | 'oneFinancial' | 'legacy' | 'security' | 'Accenture' | 'Santander' | 'Pioneer' | 'leafBarber' | 'FusionDMS' | 'cmp' | 'dotdoc' | 'mobileWebExpansion' | 'draupnir' | 'coffeeClass' | 'masteringTailwind' | 'dddForum' | 'Feedback Widget'

const YEAR_KEYS = ['2024', '2023', '2022', '2021', '2020', '2019'] as const
type YearKey = typeof YEAR_KEYS[number]

const mediaByYear: Record<YearKey, { href: string, src: string, altKey: MediaAltKeys }[]> = {
  2019: [
    { href: 'https://github.com/Tonybsilva-dev', src: '/careers/2019/github-logo.png', altKey: 'github' },
    { href: 'https://judge.beecrowd.com/pt/profile/827547', src: '/careers/2019/beecrowd-logo.png', altKey: 'beecrowd' },
    { href: 'https://github.com/Tonybsilva-dev/Ecoleta', src: '/careers/2019/ecoleta-logo.png', altKey: 'ecoleta' },
    { href: 'https://github.com/Tonybsilva-dev/DevRadar', src: '/careers/2019/dev-radar-logo.png', altKey: 'devradar' },
  ],
  2020: [
    { href: 'https://www.linkedin.com/in/tony-silva/', src: '/careers/2020/linkedin-logo.png', altKey: 'linkedin' },
    { href: 'https://www.vicoabrasil.com.br', src: '/careers/2020/grupo-vicoa-brasil-logo.webp', altKey: 'vicoa' },
    { href: 'https://www.npmjs.com/search?q=tonybsilva', src: '/careers/2020/ui-kit-logo.png', altKey: 'uiKit' },
  ],
  2021: [
    { href: 'https://www.accenture.com/br-pt', src: '/careers/2021/accenture-brasil-logo.png', altKey: 'Accenture' },
    { href: 'https://www.oi.com.br/', src: '/careers/2021/Oi-Telemar-logo.jpeg', altKey: 'oi' },
    { href: 'https://www.santander.com.br/', src: '/careers/2021/santander-br-logo.png', altKey: 'Santander' },
    { href: 'https://pioneer.com.br/', src: '/careers/2021/pioneer-logo.png', altKey: 'Pioneer' },
  ],
  2022: [
    { href: 'https://fusiondms.com.br/login.html', src: '/careers/2022/fusiondms_logo.png', altKey: 'FusionDMS' },
    { href: 'https://play.google.com/store/apps/details?id=com.cademeupedido&hl=pt_BR&pli=1', src: '/careers/2022/cade-meu-pedido.webp', altKey: 'cmp' },
    { href: 'https://github.com/Tonybsilva-dev/DotDoc', src: '/careers/2022/electron-logo.png', altKey: 'dotdoc' },
    { href: 'https://github.com/Tonybsilva-dev/feedback-widget', src: '/careers/2022/feedback-widget.png', altKey: 'Feedback Widget' },
  ],
  2023: [
    { href: 'https://www.npmjs.com/package/@tonybsilva/draupnir', src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=500&fit=crop&crop=center', altKey: 'draupnir' },
    { href: 'https://github.com/Tonybsilva-dev/the-coffee-class', src: 'https://images.unsplash.com/photo-1587620931283-474c610e8be5?w=500&h=500&fit=crop&crop=center', altKey: 'coffeeClass' },
    { href: 'https://github.com/Tonybsilva-dev/mastering-tailwindcss', src: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=500&h=500&fit=crop&crop=center', altKey: 'masteringTailwind' },
    { href: 'https://github.com/Tonybsilva-dev/ddd-forum-api', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop&crop=center', altKey: 'dddForum' },
  ],
  2024: [
    { href: 'https://nextjs.org', src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=500&fit=crop&crop=center', altKey: 'github' },
    { href: 'https://www.typescriptlang.org', src: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=500&h=500&fit=crop&crop=center', altKey: 'github' },
    { href: 'https://aws.amazon.com', src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop&crop=center', altKey: 'github' },
    { href: 'https://reactnative.dev', src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop&crop=center', altKey: 'github' },
  ],
} as const

function YearBlock({ year }: { year: YearKey }) {
  const { t } = useLocale()
  const intro = (t(`careerTimeline.years.${year}.intro` as any) as string) || (t(`careerTimeline.y${year}` as any) as string) || ''
  const featured = (t(`careerTimeline.years.${year}.featured.items` as any) as { title: string, description: string }[]) || []
  const featuredTitle = (t(`careerTimeline.years.${year}.featured.title` as any) as string) || (t('careerTimeline.featuredProjects.title' as any) as string)
  const media = mediaByYear[year] || []

  return (
    <div>
      {intro && (
        <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          {intro}
        </p>
      )}

      {featured?.length > 0 && (
        <>
          <h4 className="text-sm md:text-base font-semibold mb-2">{featuredTitle}</h4>
          <ol className="list-decimal pl-4 space-y-2 text-xs md:text-sm">
            {featured.map((item, i) => (
              <li key={i}>
                <span className="font-medium">
                  {item.title}
                  :
                </span>
                {' '}
                <span className="text-neutral-800 dark:text-neutral-200">{item.description}</span>
              </li>
            ))}
          </ol>
        </>
      )}

      {media.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {media.map((m, i) => (
            <a key={i} href={m.href} target="_blank" rel="noopener noreferrer">
              <img
                src={m.src}
                alt={t(`careerTimeline.mediaAlts.${m.altKey}` as any) as string}
                width={500}
                height={500}
                className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 hover:scale-105 transition-transform duration-300"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export const CustomTimeline = () => {
  const { t } = useLocale()

  const careerOrder = ['present', ...YEAR_KEYS] as const

  const careerData = careerOrder.map((year) => {
    if (year === 'present') {
      return {
        title: (t('careerTimeline.nowTitle' as any) as string) || 'Present',
        content: (
          <div>
            <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
              {t('careerTimeline.y2025' as any) as string}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=500&fit=crop&crop=center"
                  alt="Next.js & React"
                  width={500}
                  height={500}
                  className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 hover:scale-105 transition-transform duration-300"
                />
              </a>
              <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=500&h=500&fit=crop&crop=center"
                  alt="TypeScript"
                  width={500}
                  height={500}
                  className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 hover:scale-105 transition-transform duration-300"
                />
              </a>
              <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop&crop=center"
                  alt="AWS & Docker"
                  width={500}
                  height={500}
                  className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 hover:scale-105 transition-transform duration-300"
                />
              </a>
              <a href="https://reactnative.dev" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop&crop=center"
                  alt="React Native"
                  width={500}
                  height={500}
                  className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        ),
      }
    }
    const y = year as YearKey
    return {
      title: y,
      content: <YearBlock year={y} />,
    }
  })

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={careerData} />
    </div>
  )
}

export default CustomTimeline
