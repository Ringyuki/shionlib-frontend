import { Dices } from 'lucide-react'
import { shionlibRequest } from '@/utils/shionlib-request'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'
import { useRouter } from '@/i18n/navigation.client'
import { Button } from '@/components/shionui/Button'

interface RandomGameProps {
  className?: string
}

export const RandomGame = ({ className }: RandomGameProps) => {
  const t = useTranslations('Components.Common.TopBar.RandomGame')
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const getRandomGame = async () => {
    let toastId: string | undefined
    try {
      setLoading(true)
      toastId = toast.loading(t('loading'))
      const { data } = await shionlibRequest().get<number | null>('/game/random')
      if (!data) {
        toast.error(t('retry'))
        return
      }
      router.push(`/game/${data}`)
    } catch {
    } finally {
      setLoading(false)
      toastId && toast.dismiss(toastId)
    }
  }
  return (
    <div className={className}>
      <Button
        appearance="ghost"
        intent="secondary"
        size="icon"
        renderIcon={<Dices className="size-4.5" />}
        onClick={getRandomGame}
        loading={loading}
        className="flex topbar:hidden"
      />
      <div
        className={cn(
          'hidden topbar:block font-normal px-4 py-2 rounded-md cursor-pointer duration-200 hover:bg-primary/5 hover:text-primary ',
          loading && 'opacity-50 pointer-events-none cursor-default',
        )}
        onClick={getRandomGame}
      >
        <span className="flex items-center gap-1">
          <Dices className="size-4" />
          {t('random')}
        </span>
      </div>
    </div>
  )
}
