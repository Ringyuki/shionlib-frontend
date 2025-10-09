import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/shionui/DropdownMenu'
import { Button } from '@/components/shionui/Button'
import { Ellipsis } from 'lucide-react'
import { Delete } from './Delete'
import { Edit } from './Edit'

interface MoreActionsProps {
  creator_id: number
  comment_id: number
}

export const MoreActions = ({ creator_id, comment_id }: MoreActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button intent="secondary" size="icon" appearance="ghost" renderIcon={<Ellipsis />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Edit creator_id={creator_id} comment_id={comment_id} />
        <Delete comment_id={comment_id} creator_id={creator_id} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
