import { Activity, ActivityType } from '@/interfaces/activity/activity.interface'
import { Card, CardContent } from '@/components/shionui/Card'
import { Avatar } from '@/components/common/user/Avatar'
import { Badge } from '@/components/shionui/Badge'
import { timeFromNow } from '@/utils/time-format'
import { getLocale } from 'next-intl/server'
import { CalendarDays, Workflow } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Comment } from './activities/Comment'
import { FileUploaded } from './activities/FileUploaded'
import { FileScaned } from './activities/FileScaned'
import { Edit } from './activities/Edit'

interface ActivityCardProps {
  activity: Activity
}

export const ActivityCard = async ({ activity }: ActivityCardProps) => {
  const locale = await getLocale()
  const t = await getTranslations('Components.Home.Activity.ActivityCard')

  const isUserActivity =
    activity.type === ActivityType.COMMENT ||
    activity.type === ActivityType.FILE_UPLOAD_TO_SERVER ||
    activity.type === ActivityType.GAME_EDIT ||
    activity.type === ActivityType.DEVELOPER_EDIT ||
    activity.type === ActivityType.CHARACTER_EDIT

  const isSystemActivity =
    activity.type === ActivityType.FILE_UPLOAD_TO_S3 ||
    activity.type === ActivityType.FILE_CHECK_OK ||
    activity.type === ActivityType.FILE_CHECK_BROKEN_OR_TRUNCATED ||
    activity.type === ActivityType.FILE_CHECK_BROKEN_OR_UNSUPPORTED ||
    activity.type === ActivityType.FILE_CHECK_ENCRYPTED ||
    activity.type === ActivityType.FILE_CHECK_HARMFUL

  return (
    <Card className="py-0">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {isUserActivity && (
            <>
              <Avatar user={activity.user} className="size-8" />
              <span className="font-medium">{activity.user.name}</span>
            </>
          )}
          {isSystemActivity && (
            <Badge variant="secondary">
              <Workflow className="size-4" />
              {t('system')}
            </Badge>
          )}
          <Badge variant="neutral">
            <CalendarDays className="size-4" />
            {timeFromNow(activity.created, locale)}
          </Badge>
        </div>
        {(() => {
          switch (activity.type) {
            case ActivityType.COMMENT:
              return <Comment activity={activity} />
            case ActivityType.FILE_UPLOAD_TO_SERVER:
            case ActivityType.FILE_UPLOAD_TO_S3:
              return <FileUploaded activity={activity} />
            case ActivityType.FILE_CHECK_OK:
            case ActivityType.FILE_CHECK_BROKEN_OR_TRUNCATED:
            case ActivityType.FILE_CHECK_BROKEN_OR_UNSUPPORTED:
            case ActivityType.FILE_CHECK_ENCRYPTED:
            case ActivityType.FILE_CHECK_HARMFUL:
              return <FileScaned activity={activity} />
            case ActivityType.GAME_EDIT:
            case ActivityType.DEVELOPER_EDIT:
            case ActivityType.CHARACTER_EDIT:
              return <Edit activity={activity} />
          }
        })()}
      </CardContent>
    </Card>
  )
}
