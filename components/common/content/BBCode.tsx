'use client'

import { bbcodeRender } from '@/utils/bbcode/render'

interface BBCodeContentProps {
  content: string
  className?: string
}

export function BBCodeContent({ content, className }: BBCodeContentProps) {
  const reactContent = bbcodeRender(content)

  return <div className={className}>{reactContent}</div>
}
