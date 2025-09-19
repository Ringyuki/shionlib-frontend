'use client'

import { LoginOrRegisteDialog } from '@/components/common/user/LoginOrRegisteDialog'
import { LogoutDialog } from '@/components/common/user/LogoutDialog'
import { useAuthDialogStore } from '@/store/authDialogStore'

export const GlobalDialogs = () => {
  const { authDialogOpen, authDialogType, closeAuthDialog, logoutDialogOpen, closeLogoutDialog } =
    useAuthDialogStore()
  return (
    <>
      <LoginOrRegisteDialog
        hideTrigger
        open={authDialogOpen}
        dialogType={authDialogType}
        onOpenChange={open => {
          if (!open) closeAuthDialog()
        }}
      />

      <LogoutDialog
        open={logoutDialogOpen}
        onOpenChange={open => {
          if (!open) closeLogoutDialog()
        }}
      />
    </>
  )
}
