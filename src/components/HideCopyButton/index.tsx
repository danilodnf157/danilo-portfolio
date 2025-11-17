'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function HideCopyButton() {
  const pathname = usePathname()

  useEffect(() => {
    // Verifica se estamos na página index (raiz ou /index)
    const isIndexPage = pathname === '/' || pathname.endsWith('/index') || pathname.match(/\/[a-z]{2,5}(-BR)?\/?$/)

    if (isIndexPage) {
      // Função para remover o botão
      const removeCopyButton = () => {
        // Múltiplos seletores para encontrar o botão
        const selectors = [
          'button[title*="Copy"]',
          'button[title*="copy"]',
          'button[aria-label*="Copy"]',
          'button[aria-label*="copy"]',
          '.nextra-copy',
        ]

        selectors.forEach((selector) => {
          try {
            const buttons = document.querySelectorAll(selector)
            buttons.forEach((button) => {
              const buttonElement = button as HTMLElement
              // Verifica se o botão está relacionado a "copy page"
              const buttonText = (buttonElement.textContent || buttonElement.title || buttonElement.getAttribute('aria-label') || '').toLowerCase()
              if (buttonText.includes('copy') && buttonText.includes('page')) {
                buttonElement.style.display = 'none'
                buttonElement.style.visibility = 'hidden'
                buttonElement.style.opacity = '0'
                buttonElement.style.pointerEvents = 'none'
                buttonElement.remove()
              }
            })
          } catch (e) {
            // Ignora erros de seletores não suportados
          }
        })
      }

      // Remove imediatamente
      removeCopyButton()

      // Remove após delays para garantir que o DOM está pronto
      const timeouts = [
        setTimeout(removeCopyButton, 100),
        setTimeout(removeCopyButton, 500),
        setTimeout(removeCopyButton, 1000),
      ]

      // Observa mudanças no DOM
      const observer = new MutationObserver(removeCopyButton)
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      return () => {
        observer.disconnect()
        timeouts.forEach(clearTimeout)
      }
    }
  }, [pathname])

  return null
}

