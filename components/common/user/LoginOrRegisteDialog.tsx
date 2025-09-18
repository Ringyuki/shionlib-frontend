'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/shionui/Dialog'
import { Button } from '@/components/shionui/Button'
import { Login } from './Login'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export const LoginOrRegisteDialog = () => {
  const t = useTranslations('Components.Common.User.LoginOrRegisteDialog')
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">{t('title')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
        <Login onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
