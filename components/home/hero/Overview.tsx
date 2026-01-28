import { shionlibRequest } from '@/utils/shionlib-request'
import { OverviewData } from '@/interfaces/analysis/data.interface'
import { File, Gamepad2, HardDrive, Download } from 'lucide-react'
import { formatBytes } from '@/utils/bytes-format'
import { getTranslations } from 'next-intl/server'

export const Overview = async () => {
  const { data } = await shionlibRequest().get<OverviewData>('/analysis/data/overview')
  const t = await getTranslations('Components.Home.Hero.Overview')
  return (
    <div className="grid-cols-2 gap-4 hidden md:grid">
      <div className="flex flex-col justify-around shadow-card border rounded-md p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base text-muted-foreground">{t('games')}</h3>
          <Gamepad2 className="size-8 text-primary ml-auto" />
        </div>
        <span className="text-3xl font-bold">{data?.games}</span>
      </div>
      <div className="flex flex-col justify-around shadow-card border rounded-md p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base text-muted-foreground">{t('files')}</h3>
          <File className="size-8 text-info ml-auto" />
        </div>
        <span className="text-3xl font-bold">{data?.files}</span>
      </div>
      <div className="flex flex-col justify-around shadow-card border rounded-md p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base text-muted-foreground">{t('storage')}</h3>
          <HardDrive className="size-8 text-success ml-auto" />
        </div>
        <span className="text-3xl font-bold">{formatBytes(data?.storage ?? 0)}</span>
      </div>
      <div className="flex flex-col justify-around shadow-card border rounded-md p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base text-muted-foreground">{t('24-hour-traffic')}</h3>
          <Download className="size-8 text-warning ml-auto" />
        </div>
        <span className="text-3xl font-bold">{formatBytes(data?.bytes_gotten ?? 0)}</span>
      </div>
    </div>
  )
}
