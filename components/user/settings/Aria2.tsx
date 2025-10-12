'use client'

import { useAria2Store } from '@/store/aria2Store'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@/components/shionui/Card'
import { Input } from '@/components/shionui/Input'
import { Form, FormItem, FormLabel, FormControl } from '@/components/shionui/Form'
import { useForm, Controller } from 'react-hook-form'
import { Zap } from 'lucide-react'
import { InputNumber } from '@/components/shionui/InputNumber'
import { Button } from '@/components/shionui/Button'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const Aria2 = () => {
  const t = useTranslations('Components.User.Settings.Aria2')
  const { getSettings, setSettings } = useAria2Store()
  const [, setPort] = useState<number>()
  const [, setAuthSecret] = useState<string>('')
  useEffect(() => {
    setPort(getSettings().port)
    setAuthSecret(getSettings().auth_secret)
  }, [getSettings])

  const form = useForm<{ port: number; authSecret: string }>({
    defaultValues: { port: undefined as unknown as number, authSecret: '' },
  })
  useEffect(() => {
    const s = getSettings()
    form.reset({ port: s.port, authSecret: s.auth_secret })
  }, [getSettings, form])

  const onSubmit = (data: { port: number; authSecret: string }) => {
    setPort(data.port)
    setAuthSecret(data.authSecret)
    setSettings({ port: data.port, auth_secret: data.authSecret })
    toast.success(t('success'))
  }
  const onSave = () => {
    form.handleSubmit(onSubmit)()
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{t('title')}</CardTitle>
        <CardDescription className="text-card-foreground">{t('description')}</CardDescription>
        <CardAction>
          <Zap className="size-12 text-yellow-500" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel>{t('port')}</FormLabel>
              <FormControl>
                <Controller
                  name="port"
                  control={form.control}
                  render={({ field }) => <InputNumber {...field} min={1} max={65535} />}
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>{t('authSecret')}</FormLabel>
              <FormControl>
                <Controller
                  name="authSecret"
                  control={form.control}
                  render={({ field }) => <Input {...field} clearable type="password" />}
                />
              </FormControl>
            </FormItem>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button intent="primary" onClick={onSave}>
          {t('save')}
        </Button>
      </CardFooter>
    </Card>
  )
}
