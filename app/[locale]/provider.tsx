'use client'

import { ThemeProvider } from 'next-themes'
import { AppProgressProvider as ProgressProvider } from '@bprogress/next'
import { SocketProvider } from '@/libs/socketio/core'

export default function ShionlibProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      enableColorScheme={false}
    >
      <ProgressProvider
        height="3px"
        color="var(--primary)"
        options={{ showSpinner: false }}
        shallowRouting
        disableSameURL
      >
        <SocketProvider>{children}</SocketProvider>
      </ProgressProvider>
    </ThemeProvider>
  )
}
