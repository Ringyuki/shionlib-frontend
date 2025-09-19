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

interface LoginOrRegisteDialogProps {
  initialDialogType?: 'login' | 'register'
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  dialogType?: 'login' | 'register'
  onDialogTypeChange?: (type: 'login' | 'register') => void
  hideTrigger?: boolean
}

export const LoginOrRegisteDialog = ({
  initialDialogType = 'login',
  className,
  open: openProp,
  onOpenChange,
  dialogType: typeProp,
  onDialogTypeChange,
  hideTrigger,
}: LoginOrRegisteDialogProps) => {
  const t = useTranslations('Components.Common.User.LoginOrRegisteDialog')
  const [openInner, setOpenInner] = useState(false)
  const [dialogTypeInner, setDialogTypeInner] = useState<'login' | 'register'>(initialDialogType)

  const isControlledOpen = openProp !== undefined

  const open = isControlledOpen ? (openProp as boolean) : openInner
  const setOpen = (next: boolean) => {
    if (!isControlledOpen) setOpenInner(next)
    onOpenChange?.(next)
  }

  const setDialogType = (next: 'login' | 'register') => {
    setDialogTypeInner(next)
    onDialogTypeChange?.(next)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          <Button size="sm" className={className}>
            {t('button')}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogTitle>
          {dialogTypeInner === 'login' ? t('loginTitle') : t('registerTitle')}
        </DialogTitle>
        <DialogDescription className="flex items-center">
          {dialogTypeInner === 'login' ? t('loginDescription') : t('registerDescription')}{' '}
          <Button
            intent="primary"
            appearance="ghost"
            size="sm"
            onClick={() => setDialogType(dialogTypeInner === 'login' ? 'register' : 'login')}
          >
            {dialogTypeInner === 'login'
              ? t('loginDescriptionLinkText')
              : t('registerDescriptionLinkText')}
          </Button>
        </DialogDescription>
        <Login onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
