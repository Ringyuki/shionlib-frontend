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
import { getTranslations } from 'next-intl/server'

interface GameContentProps {
  game: GameData
}

export const GameContent = async ({ game }: GameContentProps) => {
  const t = await getTranslations('Components.Game.Description.GameContent')
  return (
    <div className="flex flex-col gap-4 shadow-xl bg-card-soft w-full rounded-md p-4">
      <div className="w-full">
        <Tabs defaultValue="gameDetail">
          <TabsList className="w-full!">
            <TabsTrigger value="gameDetail">{t('gameDetail')}</TabsTrigger>
            <TabsTrigger value="gameCharacter">{t('gameCharacter')}</TabsTrigger>
          </TabsList>
          <TabsContents>
            <TabsContent value="gameDetail">
              <GameDetail game={game} />
            </TabsContent>
            <TabsContent value="gameCharacter">
              <GameCharacter characters={game.characters} />
            </TabsContent>
          </TabsContents>
        </Tabs>
      </div>
    </div>
  )
}
