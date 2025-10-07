import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/shionui/AlertDialog'
import { useShionlibUserStore } from '@/store/userStore'
import { shionlibRequest } from '@/utils/shionlib-request'
import { useState } from 'react'
import { useAuthDialogStore } from '@/store/authDialogStore'
import { useTranslations } from 'next-intl'

interface LogoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const LogoutDialog = ({ open, onOpenChange }: LogoutDialogProps) => {
  const t = useTranslations('Components.Common.User.LogoutDialog')
  const [loading, setLoading] = useState(false)

  const { closeLogoutDialog } = useAuthDialogStore()

  const handleLogout = async () => {
    setLoading(true)
    try {
      useShionlibUserStore.getState().logout()
      await shionlibRequest().post('/auth/logout')
    } catch {
    } finally {
      setLoading(false)
      closeLogoutDialog()
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent tone="destructive">
        <AlertDialogHeader>
          <AlertDialogTitle>{t('title')}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{t('description')}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel tone="destructive">{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction tone="destructive" loading={loading} onClick={handleLogout}>
            {t('logout')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
