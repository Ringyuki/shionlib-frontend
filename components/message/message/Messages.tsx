import { Message as MessageInterface } from '@/interfaces/message/message.interface'
import { PaginatedMeta } from '@/interfaces/api/shionlib-api-res.interface'
import { Item } from './Item'
import { Pagination } from '@/components/common/content/Pagination'
import { Empty } from '@/components/common/content/Empty'

interface MessagesProps {
  messages: MessageInterface[]
  meta: PaginatedMeta
}

export const Messages = ({ messages, meta }: MessagesProps) => {
  if (messages.length === 0) return <Empty />
  return (
    <div className="flex flex-col gap-4">
      {messages.map(message => (
        <Item key={message.id} message={message} />
      ))}
      {meta.totalPages > 1 && (
        <Pagination currentPage={meta.currentPage} totalPages={meta.totalPages} />
      )}
    </div>
  )
}
