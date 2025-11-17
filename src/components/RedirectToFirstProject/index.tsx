'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface RedirectToFirstProjectProps {
  lang: string
}

export default function RedirectToFirstProject({ lang }: RedirectToFirstProjectProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Redireciona para o primeiro projeto em ordem alfabética
    const firstProject = 'feedback-widget'
    const targetPath = `/${lang}/docs/projects/${firstProject}`

    if (pathname?.endsWith('/docs') || pathname?.endsWith('/docs/')) {
      router.replace(targetPath)
    }
  }, [router, pathname, lang])

  return null
}
