'use client'

import { GameData } from '@/interfaces/game/game.interface'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from '@/components/shionui/animated/Tabs'
import { GameDetail } from './GameDetail'
import { GameCharacter } from './GameCharacter'
import { useTranslations } from 'next-intl'
import { CommentContent } from '@/components/common/comment/CommentContent'
import { Comment } from '@/interfaces/comment/comment.interface'
import { useSearchParams } from 'next/navigation'

interface GameContentProps {
  game: GameData
  comments: Comment[]
}

const TABS_MAP = {
  detail: 'gameDetail',
  characters: 'gameCharacter',
  comments: 'gameComment',
}

export const GameContent = ({ game, comments }: GameContentProps) => {
  const t = useTranslations('Components.Game.Description.GameContent')
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'detail'
  return (
    <div className="flex flex-col gap-4 shadow-content-strong bg-card-soft w-full rounded-md p-4">
      <div className="w-full">
        <Tabs defaultValue={tab}>
          <TabsList variant="underlined" intent="primary" showBaseline={false} className="gap-2">
            {Object.keys(TABS_MAP).map(tab => (
              <TabsTrigger key={tab} value={tab} className="text-base font-bold">
                {t(TABS_MAP[tab as keyof typeof TABS_MAP])}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContents>
            {Object.keys(TABS_MAP).map(tab => (
              <TabsContent key={tab} value={tab}>
                {tab === 'detail' && <GameDetail game={game} />}
                {tab === 'characters' && <GameCharacter characters={game.characters} />}
                {tab === 'comments' && (
                  <CommentContent game_id={String(game.id)} comments={comments} />
                )}
              </TabsContent>
            ))}
          </TabsContents>
        </Tabs>
      </div>
    </div>
  )
}
