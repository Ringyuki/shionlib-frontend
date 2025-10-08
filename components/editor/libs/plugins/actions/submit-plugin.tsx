'use client'

import { JSX, useCallback, useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND } from 'lexical'
import { Button } from '@/components/shionui/Button'
import { Kbd } from '@/components/shionui/Kbd'
import { useTranslations } from 'next-intl'
import { isIOS, isMacOs } from 'react-device-detect'

interface SubmitPluginProps {
  onSubmit?: () => void
  isLoading?: boolean
  label?: string | React.ReactNode
  disabled?: boolean
}

export function SubmitPlugin({
  onSubmit,
  label,
  disabled,
  isLoading,
}: SubmitPluginProps): JSX.Element | null {
  const t = useTranslations('Components.Editor.Actions')

  const [editor] = useLexicalComposerContext()
  const handleSubmit = useCallback(() => {
    if (!onSubmit || disabled) return
    onSubmit()
  }, [onSubmit, disabled])

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event: KeyboardEvent) => {
        if (!event) return false
        if (event.metaKey || event.ctrlKey) {
          event.preventDefault()
          handleSubmit()
          return true
        }
        return false
      },
      COMMAND_PRIORITY_HIGH,
    )
  }, [editor, handleSubmit])

  const [isApple, setIsApple] = useState(false)
  useEffect(() => {
    setIsApple(isMacOs || isIOS)
  }, [isMacOs, isIOS])

  return (
    <Button
      size={'sm'}
      onClick={handleSubmit}
      loading={isLoading}
      disabled={disabled}
      className="ml-2"
    >
      {label || (
        <div className="flex items-center gap-1">
          <span>{t('submit')}</span>
          <span className="inline-flex items-center text-xs">
            <Kbd className="text-primary text-[0.6rem]">{isApple ? '⌘' : 'Ctrl'}</Kbd>
            <span>+</span>
            <Kbd className="text-primary text-[0.6rem]">Enter</Kbd>
          </span>
        </div>
      )}
    </Button>
  )
}
