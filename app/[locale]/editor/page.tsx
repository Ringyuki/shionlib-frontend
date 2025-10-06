'use client'

import { useState } from 'react'
import { SerializedEditorState } from 'lexical'

import { Editor } from '@/components/editor/Editor'

export const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
} as unknown as SerializedEditorState

export default function EditorPage() {
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue)
  return (
    <div className="flex flex-col w-full">
      <Editor
        editorSerializedState={editorState}
        onSerializedChange={value => setEditorState(value)}
      />
    </div>
  )
}
