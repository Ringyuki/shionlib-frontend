import { Activity, ActivityType } from '@/interfaces/activity/activity.interface'
import { StageState } from '../interfaces/file-progress.interface'
import { stageDefinitions } from '../constants/file-progress'
import { BadgeVariant } from '@/components/shionui/Badge'

export const buildStageStates = (activities: Activity[]): StageState[] => {
  return stageDefinitions.map(stage => {
    const stageActivities = activities.filter(activity => stage.types.includes(activity.type))

    if (!stageActivities.length) {
      return { ...stage, completed: false, failed: false }
    }

    const latestActivity = stageActivities.reduce((latest, current) => {
      const latestTime = new Date(latest.created).getTime()
      const currentTime = new Date(current.created).getTime()
      return currentTime > latestTime ? current : latest
    }, stageActivities[0])

    const failed = stage.key === 'scan' && latestActivity.type !== ActivityType.FILE_CHECK_OK

    return {
      ...stage,
      completed: true,
      failed,
      latestActivity,
    }
  })
}

export const getPrimaryStatus = (stages: StageState[]) => {
  const hasFailure = stages.some(stage => stage.failed)
  if (hasFailure) {
    return { variant: 'destructive' as BadgeVariant, labelKey: 'status.failed' }
  }

  const allCompleted = stages.every(stage => stage.completed)
  if (allCompleted) {
    return { variant: 'success' as BadgeVariant, labelKey: 'status.completed' }
  }

  const inProgress = stages.some(stage => stage.completed)
  return inProgress
    ? { variant: 'info' as BadgeVariant, labelKey: 'status.inProgress' }
    : { variant: 'neutral' as BadgeVariant, labelKey: 'status.waiting' }
}
