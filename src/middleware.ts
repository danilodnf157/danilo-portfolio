export { middleware } from 'nextra/locales'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - img (image files)
     */
    // Exclude static assets and folders from locale middleware
    '/((?!api|_next/static|_next/image|favicon.ico|img|images|cv|careers|_pagefind).*)',
  ],
}
