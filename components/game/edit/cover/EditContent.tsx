import { GameCover } from '@/interfaces/game/game.interface'
import { z } from 'zod'
import { gameCoverSchemaType } from './Form'
import { CoverForm } from './Form'

interface EditContentProps {
  cover: GameCover
  onSubmit: (data: z.infer<typeof gameCoverSchemaType>) => void
  isSubmitting: boolean
}

export const EditContent = ({ cover, onSubmit, isSubmitting }: EditContentProps) => (
  <CoverForm cover={cover} onSubmit={onSubmit} loading={isSubmitting} />
)
