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
import { useRouter } from '@/i18n/navigation.client'
import { useCallback, useState } from 'react'

interface GameContentProps {
  game: GameData
  comments: Comment[]
  initialTab?: string
}

const TABS_MAP = {
  detail: 'gameDetail',
  characters: 'gameCharacter',
  comments: 'gameComment',
}

export const GameContent = ({ game, comments, initialTab }: GameContentProps) => {
  const t = useTranslations('Components.Game.Description.GameContent')
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(() => {
    const validTabs = Object.keys(TABS_MAP)
    return initialTab && validTabs.includes(initialTab) ? initialTab : 'detail'
  })

  const handleChange = useCallback(
    (value: string) => {
      setActiveTab(value)
      router.push(`/game/${game.id}?tab=${value}`, { scroll: false })
    },
    [game.id, router],
  )
  return (
    <div className="flex flex-col gap-4 shadow-content-strong bg-card-soft w-full rounded-md p-4">
      <div className="w-full">
        <Tabs value={activeTab} onValueChange={handleChange}>
          <TabsList>
            {Object.keys(TABS_MAP).map(tab => (
              <TabsTrigger key={tab} value={tab}>
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
