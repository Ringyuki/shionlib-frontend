import { PaginatedResponse } from '@/interfaces/api/shionlib-api-res.interface'
import { shionlibRequest } from '@/utils/shionlib-request'
import { Button } from '@/components/shionui/Button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from '@/components/shionui/AlertDialog'
import { getLocale } from 'next-intl/server'

interface GameCover {
  language: string
  url: string
  type: string
  dims: number[]
}

interface GameItem {
  id: number
  title_jp: string
  title_zh: string
  title_en: string
  covers: GameCover[]
  views: number
}

export async function getTestData() {
  const data = await shionlibRequest().get<PaginatedResponse<GameItem>>('/game/list')

  const locale = await getLocale()
  const getTitle = (item: GameItem): string => {
    return (item[`title_${locale}` as keyof GameItem] as string) || item.title_jp
  }
  return (
    <div className="flex flex-wrap gap-2">
      {data.data?.items.map(item => (
        <div key={item.id} className="flex gap-2">
          <Button appearance="solid" intent="primary" size="lg">
            {getTitle(item)}
          </Button>
        </div>
      ))}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button appearance="solid" intent="primary" size="lg">
            Open Alert Dialog
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent tone="warning">
          <AlertDialogHeader>
            <AlertDialogTitle>Alert Dialog</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>This is an alert dialog.</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction tone="warning">Confirm</AlertDialogAction>
            <AlertDialogCancel tone="warning">Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default function Shion() {
  return <div className="container mx-auto my-4 space-y-6">{getTestData()}</div>
}
