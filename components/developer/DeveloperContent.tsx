import { Developer } from '@/interfaces/developer/developer.interface'
import { DeveloperIntro } from './intros/DeveloperIntro'
import { GameItem } from '@/interfaces/game/game.interface'
import { GameCard } from '../game/GameCard'
import { Masonry } from '../common/shared/Masonry'

interface DeveloperContentProps {
  developer: Developer
  games: GameItem[]
  works_count: number
}

export const DeveloperContent = ({ developer, games, works_count }: DeveloperContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <DeveloperIntro developer={developer} works_count={works_count} />
      <Masonry>
        {games.map(game => (
          <div key={game.id} className="break-inside-avoid">
            <GameCard key={game.id} game={game} />
          </div>
        ))}
      </Masonry>
    </div>
  )
}
