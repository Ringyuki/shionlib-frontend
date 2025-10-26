import { Activity as ActivityInterface } from '@/interfaces/activity/activity.interface'
import { ActivityCard } from './ActivityCard'
import { Masonry } from '@/components/common/shared/Masonry'

interface ActivityProps {
  activities: ActivityInterface[]
}

export const Activity = ({ activities }: ActivityProps) => {
  return (
    <Masonry columnCountBreakpoints={{ default: 1, sm: 2, md: 2, lg: 2 }}>
      {activities.map(activity => (
        <div key={activity.id} className="break-inside-avoid">
          <ActivityCard activity={activity} />
        </div>
      ))}
    </Masonry>
  )
}
