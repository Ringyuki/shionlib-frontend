'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/shionui/Card'
import { Button } from '@/components/shionui/Button'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Mail } from 'lucide-react'
import { Input } from '@/components/shionui/Input'
import { User } from '@/interfaces/user/user.interface'
import { shionlibRequest } from '@/utils/shionlib-request'
import { DialogFlow } from '@/components/user/settings/email/DialogFlow'
import { DrawerFlow } from '@/components/user/settings/email/DrawerFlow'
import { useMedia } from 'react-use'
import { toast } from 'react-hot-toast'
import { useShionlibUserStore } from '@/store/userStore'

interface EmailSettingsProps {
  email: User['email']
}

export const EmailSettings = ({ email }: EmailSettingsProps) => {
  const t = useTranslations('Components.User.Settings.Email')
  const [isGettingCode, setIsGettingCode] = useState(false)
  const [currentCodeUuid, setCurrentCodeUuid] = useState<string | null>(null)
  const { logout } = useShionlibUserStore()
  const isMobile = useMedia('(max-width: 1024px)', false)
  const [open, setOpen] = useState(false)

  const [countingDown, setCoutingDown] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const handleCountingDown = async () => {
    setCoutingDown(true)
    setCountdown(60)
    await new Promise(resolve => setTimeout(resolve, 60000))
    setCountdown(0)
    setCoutingDown(false)
  }
  useEffect(() => {
    if (countingDown) {
      setTimeout(() => setCountdown(countdown - 1), 1000)
    }
  }, [countingDown, countdown])
  const handleGetCode = async () => {
    setIsGettingCode(true)
    try {
      const data = await shionlibRequest().post<{ uuid: string }>('/user/info/email/request')
      setCurrentCodeUuid(data.data?.uuid!)
      handleCountingDown()
      setOpen(true)
    } catch {
    } finally {
      setIsGettingCode(false)
    }
  }

  const [isUpdating, setIsUpdating] = useState(false)
  const onSubmit = async (data: {
    currentCode: string
    newEmail: string
    newEmailCodeUuid: string
    newEmailCode: string
  }) => {
    try {
      setIsUpdating(true)
      await shionlibRequest().post('/user/info/email', {
        data: {
          email: data.newEmail,
          newCode: data.newEmailCode,
          newUuid: data.newEmailCodeUuid,
          currentCode: data.currentCode,
          currentUuid: currentCodeUuid,
        },
      })
      setOpen(false)
      toast.success(t('success'))
      logout()
    } catch {
    } finally {
      setIsUpdating(false)
    }
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('title')}</CardTitle>
          <CardDescription className="text-card-foreground">{t('description')}</CardDescription>
          <CardAction>
            <Mail className="size-12 text-success" />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <span className="text-sm">{t('currentEmail')}</span>
          <Input value={email} readOnly disabled />
          <span className="text-sm text-muted-foreground">{t('help')}</span>
        </CardContent>
        <CardFooter>
          <Button
            intent="primary"
            onClick={handleGetCode}
            disabled={countingDown}
            loading={isGettingCode}
          >
            {countingDown ? `${countdown}s` : t('update')}
          </Button>
        </CardFooter>
      </Card>
      {isMobile ? (
        <DrawerFlow
          open={open}
          onOpenChange={setOpen}
          currentEmail={email!}
          onSubmit={onSubmit}
          isSubmitting={isUpdating}
        />
      ) : (
        <DialogFlow
          open={open}
          onOpenChange={setOpen}
          currentEmail={email!}
          onSubmit={onSubmit}
          isSubmitting={isUpdating}
        />
      )}
    </>
  )
}
