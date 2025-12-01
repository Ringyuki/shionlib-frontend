import { Activity } from './activity/Activity'
import { Activity as ActivityInterface } from '@/interfaces/activity/activity.interface'
import { Head as ActivityHead } from './activity/Head'
import { Head as GamesHead } from './games/Head'
import { Head as NewWorksHead } from './new-works/Head'
import { Games } from './games/Games'
import { GameItem } from '@/interfaces/game/game.interface'
import { ContentLimit } from '@/interfaces/user/user.interface'
import { Ad } from '@/components/common/site/Ad'
import { NewWorks } from './new-works/NewWorks'

interface ContainerProps {
  activities: ActivityInterface[]
  games: GameItem[]
  content_limit: ContentLimit
  newWorks: GameItem[]
}

export const Container = ({ activities, games, content_limit, newWorks }: ContainerProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <NewWorksHead />
        <NewWorks newWorks={newWorks} content_limit={content_limit} />
      </div>
      <div className="flex flex-col gap-6">
        <GamesHead />
        <Games games={games} content_limit={content_limit} />
      </div>
      <Ad id={1} />
      <div className="flex flex-col gap-6">
        <ActivityHead />
        <Activity activities={activities} />
      </div>
      <Ad id={2} />
    </div>
  )
}
