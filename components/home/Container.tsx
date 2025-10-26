import { Activity } from './activity/Activity'
import { Activity as ActivityInterface } from '@/interfaces/activity/activity.interface'
import { Head as ActivityHead } from './activity/Head'
import { Head as GamesHead } from './games/Head'
import { Games } from './games/Games'
import { GameItem } from '@/interfaces/game/game.interface'
import { ContentLimit } from '@/interfaces/user/user.interface'

interface ContainerProps {
  activities: ActivityInterface[]
  games: GameItem[]
  content_limit: ContentLimit
}

export const Container = ({ activities, games, content_limit }: ContainerProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <GamesHead />
        <Games games={games} content_limit={content_limit} />
      </div>
      <div className="flex flex-col gap-6">
        <ActivityHead />
        <Activity activities={activities} />
      </div>
    </div>
  )
}
