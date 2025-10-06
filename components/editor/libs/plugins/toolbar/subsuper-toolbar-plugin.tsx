'use client'

import { useState } from 'react'
import { $isTableSelection } from '@lexical/table'
import { $isRangeSelection, BaseSelection, FORMAT_TEXT_COMMAND } from 'lexical'
import { SubscriptIcon, SuperscriptIcon } from 'lucide-react'

import { useToolbarContext } from '@/components/editor/libs/context/toolbar-context'
import { useUpdateToolbarHandler } from '@/components/editor/libs/editor-hooks/use-update-toolbar'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useTranslations } from 'next-intl'

export function SubSuperToolbarPlugin() {
  const t = useTranslations('Components.Editor.Toolbar')
  const { activeEditor } = useToolbarContext()
  const [isSubscript, setIsSubscript] = useState(false)
  const [isSuperscript, setIsSuperscript] = useState(false)

  const $updateToolbar = (selection: BaseSelection) => {
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      setIsSubscript(selection.hasFormat('subscript'))
      setIsSuperscript(selection.hasFormat('superscript'))
    }
  }

  useUpdateToolbarHandler($updateToolbar)

  return (
    <ToggleGroup
      type="single"
      defaultValue={isSubscript ? 'subscript' : isSuperscript ? 'superscript' : ''}
    >
      <ToggleGroupItem
        value="subscript"
        size="sm"
        aria-label={t('toggleSubscript')}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')
        }}
        variant={'outline'}
      >
        <SubscriptIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="superscript"
        size="sm"
        aria-label={t('toggleSuperscript')}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript')
        }}
        variant={'outline'}
      >
        <SuperscriptIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
