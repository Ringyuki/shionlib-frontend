import { MessageType } from '@/interfaces/message/message.interface'
import { Bot, MessageSquareReply, Heart } from 'lucide-react'

export const typeConfig: Record<MessageType, { icon: React.ReactNode; color: string }> = {
  [MessageType.SYSTEM]: {
    icon: <Bot className="size-4" />,
    color: 'text-blue-500',
  },
  [MessageType.COMMENT_REPLY]: {
    icon: <MessageSquareReply className="size-4" />,
    color: 'text-emerald-500',
  },
  [MessageType.COMMENT_LIKE]: {
    icon: <Heart className="size-4" />,
    color: 'text-rose-500',
  },
}
