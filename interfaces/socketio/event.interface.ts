import { Message } from '@/interfaces/message/message.interface'

export interface SocketEvent {
  event: Event
  data: MessageNewEvent | MessageUnreadEvent
}

export type Event = 'connect' | 'message:new' | 'message:unread'

export interface MessageNewEvent {
  message: Message
}
export interface MessageUnreadEvent {
  unread: number
}
