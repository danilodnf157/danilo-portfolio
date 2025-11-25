import createWithNextra from 'nextra'

const withNextra = createWithNextra({
  defaultShowCopyCode: true,
  unstable_shouldAddLocaleToLinks: true,
})

/**
 * @type {import("next").NextConfig}
 */
export default withNextra({
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,

    // 👇 AQUI ESTÁ O QUE FALTAVA
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  cleanDistDir: true,

  i18n: {
    locales: ['zh', 'en', 'pt-BR'],
    defaultLocale: 'en',
  },

  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
})
