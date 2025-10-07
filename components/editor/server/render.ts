import 'server-only'

import { createHeadlessEditor } from '@lexical/headless'
import { $generateHtmlFromNodes } from '@lexical/html'
import type { SerializedEditorState } from 'lexical'

import { serverNodes as nodes } from '@/components/editor/server/nodes'
import { editorTheme } from '@/components/editor/libs/themes/editor-theme'
import { clean } from '@/components/editor/helper/sanitize'
import { ensureJSDOM } from '@/components/editor/helper/ensureJSDOM'

export const renderLexicalHTML = (serialized: SerializedEditorState) => {
  if (typeof window !== 'undefined') {
    throw new Error('renderLexicalHTML must be called on the server only')
  }
  ensureJSDOM()
  const editor = createHeadlessEditor({ namespace: 'Renderer', nodes, theme: editorTheme })
  const normalized = typeof serialized === 'string' ? serialized : JSON.stringify(serialized)
  const editorState = editor.parseEditorState(normalized)
  let html = ''
  editor.setEditorState(editorState)
  editorState.read(() => {
    html = $generateHtmlFromNodes(editor)
  })
  return clean(html)
}
