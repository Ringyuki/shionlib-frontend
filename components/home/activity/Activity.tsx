import { Activity as ActivityInterface } from '@/interfaces/activity/activity.interface'
import { ActivityCard } from './ActivityCard'
import { Masonry } from '@/components/common/shared/Masonry'
import { FileProgress } from './activities/FileProgress'
import { buildActivityFeed } from './activities/helpers/activity-feed.helper'

interface ActivityProps {
  activities: ActivityInterface[]
}

export const Activity = ({ activities }: ActivityProps) => {
  const feedItems = buildActivityFeed(activities)
  return (
    <Masonry columnCountBreakpoints={{ default: 1, sm: 2, md: 2, lg: 2 }}>
      {feedItems.map(item => {
        const key = item.kind === 'file' ? `file-${item.fileKey}` : `activity-${item.activity.id}`
        return (
          <div key={key} className="break-inside-avoid">
            {item.kind === 'file' ? (
              <FileProgress activities={item.activities} />
            ) : (
              <ActivityCard activity={item.activity} />
            )}
          </div>
        )
      })}
    </Masonry>
  )
}
