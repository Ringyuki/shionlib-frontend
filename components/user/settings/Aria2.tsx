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
import { Zap, RotateCcw, FlaskConical, CheckCircle2, XCircle } from 'lucide-react'
import { InputNumber } from '@/components/shionui/InputNumber'
import { Button } from '@/components/shionui/Button'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { check } from '@/components/game/download/helpers/aria2'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shionui/Select'

interface Aria2FormData {
  protocol: 'http' | 'https'
  host: string
  port: number
  path: string
  authSecret: string
  downloadPath: string
}

const defaultSettings: Aria2FormData = {
  protocol: 'http',
  host: 'localhost',
  port: 16800,
  path: '/jsonrpc',
  authSecret: '',
  downloadPath: '',
}

type TestStatus = 'idle' | 'testing' | 'success' | 'error'

export const Aria2 = () => {
  const t = useTranslations('Components.User.Settings.Aria2')
  const { getSettings, setSettings } = useAria2Store()
  const [testStatus, setTestStatus] = useState<TestStatus>('idle')
  const [testMessage, setTestMessage] = useState<string>('')

  const form = useForm<Aria2FormData>({
    defaultValues: defaultSettings,
  })

  useEffect(() => {
    const s = getSettings()
    form.reset({
      protocol: s.protocol,
      host: s.host,
      port: s.port,
      path: s.path,
      authSecret: s.auth_secret,
      downloadPath: s.downloadPath,
    })
  }, [getSettings, form])

  const onSubmit = (data: Aria2FormData) => {
    setSettings({
      protocol: data.protocol,
      host: data.host,
      port: data.port,
      path: data.path,
      auth_secret: data.authSecret,
      downloadPath: data.downloadPath,
    })
    toast.success(t('success'))
  }

  const onSave = () => {
    form.handleSubmit(onSubmit)()
  }

  const onReset = () => {
    form.reset(defaultSettings)
    setSettings({
      protocol: defaultSettings.protocol,
      host: defaultSettings.host,
      port: defaultSettings.port,
      path: defaultSettings.path,
      auth_secret: defaultSettings.authSecret,
      downloadPath: defaultSettings.downloadPath,
    })
    setTestStatus('idle')
    setTestMessage('')
    toast.success(t('resetSuccess'))
  }

  const onTest = async () => {
    const values = form.getValues()
    setTestStatus('testing')
    setTestMessage('')

    try {
      const result = await check(
        values.protocol,
        values.host,
        values.port,
        values.path,
        values.authSecret,
      )

      if (result === true) {
        setTestStatus('success')
        setTestMessage(t('testSuccess'))
      } else {
        setTestStatus('error')
        if (result.details === 'aria2FailedToFetch') {
          setTestMessage(t('testFailedToConnect'))
        } else if (result.details?.message === 'Unauthorized') {
          setTestMessage(t('testUnauthorized'))
        } else {
          setTestMessage(t('testFailed'))
        }
      }
    } catch (error) {
      setTestStatus('error')
      setTestMessage(t('testFailed'))
    }
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
              <FormLabel>{t('protocol')}</FormLabel>
              <FormControl>
                <Controller
                  name="protocol"
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('protocolPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="http">HTTP</SelectItem>
                        <SelectItem value="https">HTTPS</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>{t('host')}</FormLabel>
              <FormControl>
                <Controller
                  name="host"
                  control={form.control}
                  render={({ field }) => (
                    <Input {...field} clearable placeholder={t('hostPlaceholder')} />
                  )}
                />
              </FormControl>
            </FormItem>
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
              <FormLabel>{t('path')}</FormLabel>
              <FormControl>
                <Controller
                  name="path"
                  control={form.control}
                  render={({ field }) => (
                    <Input {...field} clearable placeholder={t('pathPlaceholder')} />
                  )}
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
            <FormItem>
              <FormLabel>{t('downloadPath')}</FormLabel>
              <FormControl>
                <Controller
                  name="downloadPath"
                  control={form.control}
                  render={({ field }) => (
                    <Input {...field} clearable placeholder={t('downloadPathPlaceholder')} />
                  )}
                />
              </FormControl>
            </FormItem>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex gap-2 flex-wrap items-center">
            <Button intent="primary" onClick={onSave}>
              {t('save')}
            </Button>
            <Button intent="neutral" appearance="soft" onClick={onReset} renderIcon={<RotateCcw />}>
              {t('reset')}
            </Button>
            <Button
              intent="neutral"
              appearance="ghost"
              onClick={onTest}
              loading={testStatus === 'testing'}
              renderIcon={<FlaskConical />}
            >
              {t('test')}
            </Button>
            {testStatus !== 'idle' && testStatus !== 'testing' && (
              <div className="flex items-center gap-2 text-sm">
                {testStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span className="text-green-600 dark:text-green-400">{testMessage}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="size-4 text-red-500" />
                    <span className="text-red-600 dark:text-red-400">{testMessage}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
