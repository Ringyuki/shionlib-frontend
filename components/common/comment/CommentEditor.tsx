import { $getRoot, SerializedEditorState } from 'lexical'
import { initialValue } from './constants/initialValue'
import { Editor } from '@/components/editor/Editor'
import { useState, useImperativeHandle, forwardRef } from 'react'

interface CommentEditorProps {
  onSubmit: (serialized: SerializedEditorState) => void
  isSubmitting: boolean
}

export const CommentEditor = forwardRef(({ onSubmit, isSubmitting }: CommentEditorProps, ref) => {
  const [serialized, setSerialized] = useState<SerializedEditorState>(initialValue)
  const [wordsCount, setWordsCount] = useState(0)
  const [clearSignal, setClearSignal] = useState(0)
  useImperativeHandle(ref, () => ({
    clearEditor: () => {
      setClearSignal(s => s + 1)
    },
  }))

  return (
    <div className="flex flex-col w-full">
      <Editor
        editorSerializedState={serialized}
        onSerializedChange={value => setSerialized(value)}
        autoFocus={false}
        onChange={state => {
          const count = state.read(() => $getRoot().getTextContentSize())
          setWordsCount(count)
        }}
        onSubmit={() => onSubmit(serialized)}
        isSubmitting={isSubmitting}
        isSubmitDisabled={wordsCount === 0}
        clearSignal={clearSignal}
      />
    </div>
  )
})
