'use client'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { CLEAR_EDITOR_COMMAND } from 'lexical'
import { Trash2Icon } from 'lucide-react'

import { Button } from '@/components/shionui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shionui/Dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shionui/Tooltip'
import { useTranslations } from 'next-intl'

export function ClearEditorActionPlugin() {
  const t = useTranslations('Components.Editor.Actions')
  const [editor] = useLexicalComposerContext()

  return (
    <Dialog>
      <Tooltip disableHoverableContent>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size={'sm'} appearance={'ghost'} className="p-2">
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('clearEditor')}</TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('clearEditor')}</DialogTitle>
          <DialogDescription>{t('clearEditorConfirm')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button appearance="outline">{t('cancel')}</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              intent="destructive"
              onClick={() => {
                editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
              }}
            >
              {t('clear')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
