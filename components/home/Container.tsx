import { Activity } from './activity/Activity'
import { Activity as ActivityInterface } from '@/interfaces/activity/activity.interface'
import { Head as ActivityHead } from './activity/Head'

interface ContainerProps {
  activities: ActivityInterface[]
}

export const Container = ({ activities }: ContainerProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <ActivityHead />
        <Activity activities={activities} />
      </div>
    </div>
  )
}
