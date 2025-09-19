import { Button } from '@/components/shionui/Button'
import { useShionlibUserStore } from '@/store/userStore'
import { useTranslations } from 'next-intl'
import { Control, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { email, z } from 'zod'
import { Input } from '@/components/shionui/Input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/shionui/InputOTP'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shionui/Form'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { shionlibRequest } from '@/utils/shionlib-request'
import { verficationCodeUtil } from '@/utils/verification-code'

interface RegisterProps {
  onSuccess?: () => void
}

export const Register = ({ onSuccess }: RegisterProps) => {
  const t = useTranslations('Components.Common.User.Register')

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/

  const registerSchema = z
    .object({
      name: z.string().min(1, t('validation.username')),
      email: z.email(t('validation.email')),
      verify_code: z.string().min(1, t('validation.verifyCode')),
      password: z
        .string()
        .min(8, t('validation.password'))
        .regex(passwordRegex, t('validation.passwordRegex')),
      password_confirm: z.string().min(8, t('validation.password')),
    })
    .refine(data => data.password === data.password_confirm, {
      path: ['password_confirm'],
      message: t('validation.passwordDiff'),
    })

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      verify_code: '',
      password: '',
      password_confirm: '',
    },
  })

  const [registerLoading, setRegisterLoading] = useState(false)
  const [verifyCodeUuid, setVerifyCodeUuid] = useState<string | null>(null)

  const [verifyCodeLoading, setVerifyCodeLoading] = useState(false)
  const [countingDown, setCoutingDown] = useState(false)
  const [countdown, setCountdown] = useState(60)
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
  const getVerifyCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!form.getValues('email') || form.formState.errors.email) {
      toast.error(t('validation.email'))
      form.setFocus('email')
      return
    }
    try {
      setVerifyCodeLoading(true)
      const data = await verficationCodeUtil().get(form.getValues('email'))
      if (data.data?.uuid) {
        setVerifyCodeUuid(data.data.uuid)
        toast.success(t('verifyCodeSent'))
        handleCountingDown()
      } else {
        toast.error(t('verifyCodeSentError'))
      }
    } catch {
    } finally {
      setVerifyCodeLoading(false)
    }
  }

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      setRegisterLoading(true)
      await shionlibRequest().post('/user', {
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          code: data.verify_code,
          uuid: verifyCodeUuid,
        },
      })
    } catch {
    } finally {
      setRegisterLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control as Control<z.infer<typeof registerSchema>>}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('username')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control as Control<z.infer<typeof registerSchema>>}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <div className="flex w-full items-center gap-2">
                  <Input {...field} />
                  <Button
                    appearance="outline"
                    onClick={getVerifyCode}
                    loading={verifyCodeLoading}
                    disabled={countingDown}
                  >
                    {countingDown ? `${countdown}s` : t('getVerifyCode')}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control as Control<z.infer<typeof registerSchema>>}
          name="verify_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('verifyCode')}</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={(field.value ?? '').toUpperCase()}
                  onChange={val => field.onChange(val.toUpperCase())}
                  pasteTransformer={p => p.toUpperCase()}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control as Control<z.infer<typeof registerSchema>>}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control as Control<z.infer<typeof registerSchema>>}
          name="password_confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('passwordConfirm')}</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={registerLoading} className="w-full">
          {t('register')}
        </Button>
      </form>
    </Form>
  )
}
