'use client'

import Image from 'next/image'
import { useCallback, useMemo } from 'react'
import { useLocale } from '@/hooks'
import { cn } from '@/lib/utils'

interface WorkExperience {
  company: string
  role: string
  period: string
  description: string
}

interface ContactInfo {
  website?: string
  email: string
  phone?: string
}

interface SocialLinks {
  linkedin?: string
  github?: string
  twitter?: string
}

interface ResumeData {
  profileImage?: string
  name: string
  currentRole: string
  currentCompany?: string
  contact: ContactInfo
  social: SocialLinks
  workExperience: WorkExperience[]
  stack: string[]
  downloadResumeUrl?: string
}

export default function ResumeLayout() {
  const { t } = useLocale()

  // Memoize resume data to avoid recalculation on every render
  const resumeData = useMemo(() => t('resume' as any) as ResumeData, [t])

  // Use API route to ensure PDF is served regardless of locale
  const resumeUrl = useMemo(() => '/api/resume/download', [])

  // Memoize handleDownload to avoid recreating on every render
  const handleDownload = useCallback(async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    // Build absolute URL to avoid locale issues
    const absoluteUrl = typeof window !== 'undefined'
      ? new URL(resumeUrl, window.location.origin).toString()
      : resumeUrl

    try {
      const response = await fetch(absoluteUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/pdf',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'antonio-silva.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }
    catch {
      // Fallback: navigate directly to the API route
      window.location.href = absoluteUrl
    }
  }, [resumeUrl])

  // Memoize share handler to avoid recreating on every render
  const handleShare = useCallback(async () => {
    if (typeof navigator === 'undefined' || !('share' in navigator)) {
      return
    }

    try {
      await navigator.share({
        title: `${resumeData.name} - ${resumeData.currentRole}`,
        text: `Conheça o portfólio de ${resumeData.name}`,
        url: window.location.href,
      })
    }
    catch (error) {
      // Usuário cancelou ou erro ao compartilhar
      if ((error as Error).name !== 'AbortError') {
        console.error('Erro ao compartilhar:', error)
      }
    }
  }, [resumeData.name, resumeData.currentRole])

  // Memoize icon colors map to avoid recreating on every render
  const iconColors = useMemo<Record<string, string>>(() => ({
    'icon-[simple-icons--react]': '#61DAFB',
    'icon-[simple-icons--typescript]': '#3178C6',
    'icon-[simple-icons--nextdotjs]': '#000000',
    'icon-[simple-icons--nodedotjs]': '#339933',
    'icon-[simple-icons--tailwindcss]': '#06B6D4',
    'icon-[simple-icons--amazonaws]': '#FF9900',
    'icon-[simple-icons--docker]': '#2496ED',
    'icon-[simple-icons--github]': '#181717',
  }), [])

  if (!resumeData || !resumeData.name || !resumeData.workExperience || !resumeData.stack) {
    return null
  }

  return (
    <div className="bg-background text-foreground">
      <div className="w-full max-w-[1200px] mx-auto sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 w-full lg:items-stretch">
          {/* Coluna Esquerda - Informações Pessoais */}
          <aside className="w-full lg:col-span-4 flex flex-col space-y-6">
            {/* Card 1: Foto de Perfil */}
            {resumeData.profileImage && (
              <div className="w-full aspect-[4/5] sm:aspect-square relative rounded-2xl overflow-hidden">
                <Image
                  src={resumeData.profileImage}
                  alt={resumeData.name}
                  title={`${resumeData.name} - ${resumeData.currentRole}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover rounded-2xl"
                />
              </div>
            )}
            {/* Card 2: Informações Pessoais */}
            <div className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl sm:rounded-2xl p-4 sm:p-6 flex flex-col flex-1">
              <div className="space-y-6">
                {/* Nome e Cargo */}
                <div>
                  <h1 className="text-2xl font-bold mb-2">{resumeData.name}</h1>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-2">
                    {resumeData.currentRole}
                    {resumeData.currentCompany && (
                      <>
                        {' '}
                        @
                        <span className="font-bold">{resumeData.currentCompany}</span>
                      </>
                    )}
                  </p>
                </div>

                {/* Informações de Contato */}
                <div className="space-y-3">
                  {resumeData.contact.website && (
                    <div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">
                        {t('resume.contactLabels.website' as any) as string || 'Website'}
                      </span>
                      <a
                        href={resumeData.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Visitar website de ${resumeData.name}`}
                        className="text-sm hover:underline"
                      >
                        {resumeData.contact.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">
                      {t('resume.contactLabels.email' as any) as string || 'Email'}
                    </span>
                    <a
                      href={`mailto:${resumeData.contact.email}`}
                      title={`Enviar email para ${resumeData.contact.email}`}
                      className="text-sm hover:underline"
                    >
                      {resumeData.contact.email}
                    </a>
                  </div>
                  {resumeData.contact.phone && (
                    <div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">
                        {t('resume.contactLabels.phone' as any) as string || 'Phone'}
                      </span>
                      <a
                        href={`tel:${resumeData.contact.phone}`}
                        title={`Ligar para ${resumeData.contact.phone}`}
                        className="text-sm hover:underline"
                      >
                        {resumeData.contact.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Links Sociais */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-4">
                    {resumeData.social.linkedin && (
                      <a
                        href={resumeData.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Visitar perfil no LinkedIn"
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <span className="icon-[simple-icons--linkedin] text-xl"></span>
                      </a>
                    )}
                    {resumeData.social.github && (
                      <a
                        href={resumeData.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Visitar perfil no GitHub"
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                        aria-label="GitHub"
                      >
                        <span className="icon-[simple-icons--github] text-xl"></span>
                      </a>
                    )}
                    {resumeData.social.twitter && (
                      <a
                        href={resumeData.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Visitar perfil no Twitter/X"
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                        aria-label="Twitter"
                      >
                        <span className="icon-[simple-icons--x] text-xl"></span>
                      </a>
                    )}
                  </div>
                  {/* Botão Compartilhar */}
                  {typeof navigator !== 'undefined' && 'share' in navigator && (
                    <button
                      onClick={handleShare}
                      title="Compartilhar página"
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                      aria-label="Compartilhar"
                    >
                      <span className="icon-[lucide--share-2] text-xl"></span>
                    </button>
                  )}
                </div>

                {/* Botão Download Resume */}
                {(resumeUrl) && (
                  <a
                    href={resumeUrl}
                    download="antonio-silva.pdf"
                    onClick={handleDownload}
                    title="Baixar currículo em PDF"
                    className={cn(
                      'mt-auto w-full flex items-center justify-between',
                      'px-4 sm:px-5 py-2 sm:py-3 rounded-full',
                      'border border-neutral-300/40 dark:border-neutral-700',
                      'text-neutral-900 dark:text-neutral-200',
                      'font-medium text-xs sm:text-sm transition-colors',
                      'hover:border-neutral-400 dark:hover:border-neutral-500',
                    )}
                  >
                    <span>{t('resume.downloadButton' as any) as string || 'Download Resume'}</span>
                    <span className="icon-[lucide--file-down] text-lg"></span>
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* Coluna Direita - Experiência e Stack */}
          <main className="lg:col-span-8 space-y-8">
            {/* Work Experience Card */}
            <section className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl sm:rounded-2xl p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-6">
                {t('resume.workExperienceTitle' as any) as string || 'Work Experience'}
              </h2>
              <div className="space-y-6">
                {resumeData.workExperience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Stack Card */}
            <section className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-6">
                <h2 className="text-xl font-semibold whitespace-nowrap">
                  {t('resume.stackTitle' as any) as string || 'Stack'}
                </h2>
                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  {resumeData.stack.map((tech, index) => {
                    const iconColor = iconColors[tech] || 'currentColor'

                    return (
                      <div
                        key={index}
                        className="group w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 transition-all duration-300 hover:scale-110 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-700 cursor-pointer"
                      >
                        <span
                          className={cn('text-2xl sm:text-3xl [&>svg]:w-full [&>svg]:h-full', tech)}
                          style={{
                            color: iconColor,
                            filter: 'none',
                          }}
                        >
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
