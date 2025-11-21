import { useTranslations } from 'next-intl'

interface ReportProps {
  id: number
  onSuccess: (id: number) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  onLoadingChange: (loading: boolean) => void
}

export const Report = ({ id, onSuccess, open, onOpenChange, onLoadingChange }: ReportProps) => {
  const t = useTranslations('Components.Game.Download.Report')
  return <></>
}
