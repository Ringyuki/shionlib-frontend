'use client'

import { ThemeProvider } from 'next-themes'

export default function ShionlibProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      enableColorScheme={false}
    >
      {children}
    </ThemeProvider>
  )
}
