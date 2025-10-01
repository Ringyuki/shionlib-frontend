import { GameDownloadResourceFile } from '@/interfaces/game/game-download-resource'
import { useTranslations } from 'next-intl'
import { FileArchive, CloudCheck, Hash, Zap, Globe, CloudUpload } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shionui/Tooltip'
import { Button } from '@/components/shionui/Button'
import { Badge } from '@/components/shionui/Badge'
import { formatBytes } from '@/utils/bytes-format'
import { shionlibRequest } from '@/utils/shionlib-request'
import { useState } from 'react'
import { GameDownloadResourceFileLink } from '@/interfaces/game/game-download-resource'
import { toast } from 'react-hot-toast'
import { addUrl } from './helpers/aria2'

interface GameDownloadFileItemProps {
  file: GameDownloadResourceFile
}

export const GameDownloadFileItem = ({ file }: GameDownloadFileItemProps) => {
  const t = useTranslations('Components.Game.Download.GameDownloadFileItem')
  const [pushToAria2Loading, setPushToAria2Loading] = useState(false)
  const [normalDownloadLoading, setNormalDownloadLoading] = useState(false)

  const [downloadLink, setDownloadLink] = useState<string | null>(null)
  const getDownloadLink = async (): Promise<string | null> => {
    const res = await shionlibRequest().get<GameDownloadResourceFileLink>(
      `/game/download/${file.id}/link`,
    )
    const url = res.data?.file_url ?? null
    setDownloadLink(url)
    return url
  }

  const handlePushToAria2 = async () => {
    let url = downloadLink
    setPushToAria2Loading(true)
    if (!url) {
      url = await getDownloadLink()
    }
    if (!url) return

    const res = await addUrl(url, file.file_name)
    if (!res.success) {
      toast.error(t(res.message ?? 'aria2UnknownError'))
      setPushToAria2Loading(false)
      return
    }

    toast.success(t('downloadStarted'))
    setPushToAria2Loading(false)
  }
  const handleNormalDownload = async () => {
    let url = downloadLink
    if (!url) {
      setNormalDownloadLoading(true)
      url = await getDownloadLink()
      setNormalDownloadLoading(false)
    }
    if (!url) return

    const a = document.createElement('a')
    a.href = url
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    toast.success(t('downloadStarted'))
  }

  return (
    <div className="flex md:flex-row flex-col gap-2 justify-between items-center border-dashed border p-2 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium font-mono flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1">
            <FileArchive className="size-3 shrink-0" />
            <span>{file.file_name}</span>
          </span>
          <span className="text-muted-foreground text-xs">{formatBytes(file.file_size)}</span>
          {file.type === 1 && (
            <Badge
              size="sm"
              variant={
                file.file_status === 3 ? 'success' : file.file_status === 2 ? 'warning' : 'neutral'
              }
            >
              {file.file_status === 3 ? (
                <CloudCheck className="size-3" />
              ) : (
                <CloudUpload className="size-3" />
              )}
              {file.file_status === 3
                ? 'S3'
                : file.file_status === 2
                  ? t('processing')
                  : t('pending')}
            </Badge>
          )}
          {file.file_status !== 3 && (
            <Badge size="sm" variant="neutral">
              {t('onlyVisibleForYourself')}
            </Badge>
          )}
        </div>
        <div className="text-muted-foreground text-xs flex items-center gap-1 break-words break-all">
          <Hash className="size-3 shrink-0" />
          <span className="break-words break-all">{file.file_hash}</span>
        </div>
      </div>
      {file.file_status === 3 && (
        <div className="flex gap-2 w-full md:w-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                intent="primary"
                appearance="soft"
                size="icon"
                className="size-8"
                loading={pushToAria2Loading}
                onClick={handlePushToAria2}
                renderIcon={<Zap />}
              />
            </TooltipTrigger>
            <TooltipContent>
              <span>{t('pushToAria2')}</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                intent="neutral"
                appearance="ghost"
                size="icon"
                className="size-8 text-secondary-foreground/50"
                loading={normalDownloadLoading}
                onClick={handleNormalDownload}
                renderIcon={<Globe />}
              />
            </TooltipTrigger>
            <TooltipContent>
              <span>{t('normalDownload')}</span>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  )
}
