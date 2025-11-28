import { GameItem } from '@/interfaces/game/game.interface'
import { GameCard } from '@/components/game/GameCard'
import { Masonry } from '@/components/common/shared/Masonry'
import { ContentLimit } from '@/interfaces/user/user.interface'

interface NewWorksProps {
  newWorks: GameItem[]
  content_limit: ContentLimit
}

export const NewWorks = ({ newWorks, content_limit }: NewWorksProps) => {
  return (
    <Masonry>
      {newWorks.map(game => (
        <div key={game.id} className="break-inside-avoid">
          <GameCard game={game} content_limit={content_limit} />
        </div>
      ))}
    </Masonry>
  )
}
