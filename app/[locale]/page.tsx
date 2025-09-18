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
import { Input } from '@/components/shionui/Input'
import { Textarea } from '@/components/shionui/Textarea'
import { Label } from '@/components/shionui/Label'
import { GameItem } from '@/interfaces/game/game.interface'
import { GameCard } from '@/components/game/GameCard'

export async function getTestData() {
  const data = await shionlibRequest().get<PaginatedResponse<GameItem>>('/game/list')

  return (
    <div className="flex flex-wrap gap-2">
      {data.data?.items.map(item => (
        <div key={item.id} className="flex gap-2">
          <GameCard game={item} />
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

      <div className="grid w-full gap-3">
        <Label htmlFor="input">Input</Label>
        <Input clearable id="input" />
      </div>

      <div className="grid w-full gap-3">
        <Label htmlFor="textarea">Textarea</Label>
        <Textarea className="resize-none" clearable id="textarea" />
      </div>
    </div>
  )
}

export default function Shion() {
  return <div className="container mx-auto my-4 space-y-6">{getTestData()}</div>
}
