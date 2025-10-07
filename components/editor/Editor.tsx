'use client'

import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { EditorState, SerializedEditorState } from 'lexical'

import { editorTheme } from '@/components/editor/libs/themes/editor-theme'
import { TooltipProvider } from '@/components/shionui/Tooltip'

import { nodes } from './nodes'
import { Plugins } from './plugins'

const editorConfig: InitialConfigType = {
  namespace: 'Editor',
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error)
  },
}

interface EditorProps {
  editorState?: EditorState
  editorSerializedState?: SerializedEditorState
  onChange?: (editorState: EditorState) => void
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void
  autoFocus?: boolean
  onSubmit?: () => void
  isSubmitting?: boolean
  isSubmitDisabled?: boolean
  clearSignal?: number
}

export const Editor = ({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  autoFocus,
  onSubmit,
  isSubmitting,
  isSubmitDisabled,
  clearSignal,
}: EditorProps) => {
  return (
    <div className="bg-background overflow-hidden rounded-lg border shadow">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState ? { editorState: JSON.stringify(editorSerializedState) } : {}),
        }}
      >
        <TooltipProvider>
          <Plugins
            autoFocus={autoFocus}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isSubmitDisabled={isSubmitDisabled}
            clearSignal={clearSignal}
          />

          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={editorState => {
              onChange?.(editorState)
              onSerializedChange?.(editorState.toJSON())
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  )
}
