'use client'

import { ThemeProvider } from 'next-themes'
import { AppProgressProvider as ProgressProvider } from '@bprogress/next'
import { SocketProvider } from '@/libs/socketio/core'
import { Toaster as SileoToaster } from 'sileo'
import { Toaster as ReactHotToastToaster } from 'react-hot-toast'
import { reactHotToastProps, sileoToastProps } from './toastOption'

export default function ShionlibProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
      <ProgressProvider height="3px" color="var(--primary)" shallowRouting>
        <SocketProvider>
          {children}
          <SileoToaster {...sileoToastProps} />
          <ReactHotToastToaster {...reactHotToastProps} />
        </SocketProvider>
      </ProgressProvider>
    </ThemeProvider>
  )
}
