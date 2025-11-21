import { Button } from '@/components/shionui/Button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/shionui/DropdownMenu'
import { useTranslations } from 'next-intl'
import { GameDownloadResource } from '@/interfaces/game/game-download-resource'
import { Edit } from './edit/Edit'
import { Delete } from './delete/Delete'
import { Report } from './report/Report'
import { useShionlibUserStore } from '@/store/userStore'
import { Ellipsis, Pencil, Trash, TriangleAlert } from 'lucide-react'
import { useState } from 'react'

interface ActionsProps {
  downloadResource: GameDownloadResource
  onEditSuccess: (id: number, data: { file_name?: string } & Partial<GameDownloadResource>) => void
  onDeleteSuccess: (id: number) => void
  onReportSuccess: (id: number) => void
}

export const Actions = ({
  downloadResource,
  onEditSuccess,
  onDeleteSuccess,
  onReportSuccess,
}: ActionsProps) => {
  const t = useTranslations('Components.Game.Download.Actions')
  const { user } = useShionlibUserStore()

  const showEdit = user.id === downloadResource.creator.id || user.role !== 1
  const showDelete = user.role !== 1

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [reportLoading, setReportLoading] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button intent="secondary" size="icon" appearance="ghost" renderIcon={<Ellipsis />} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {showEdit && (
            <DropdownMenuItem disabled={editLoading} onClick={() => setEditOpen(true)}>
              <Pencil />
              <span>{t('edit')}</span>
            </DropdownMenuItem>
          )}
          {showDelete && (
            <DropdownMenuItem
              disabled={deleteLoading}
              onClick={() => setDeleteOpen(true)}
              variant="destructive"
            >
              <Trash />
              <span>{t('delete')}</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            disabled={reportLoading}
            onClick={() => setReportOpen(true)}
            variant="destructive"
          >
            <TriangleAlert />
            <span>{t('report')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Edit
        downloadResource={downloadResource}
        onSuccess={onEditSuccess}
        open={editOpen}
        onOpenChange={setEditOpen}
        onLoadingChange={setEditLoading}
      />
      <Delete
        id={downloadResource.id}
        onSuccess={onDeleteSuccess}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onLoadingChange={setDeleteLoading}
      />
      <Report
        id={downloadResource.id}
        onSuccess={onReportSuccess}
        open={reportOpen}
        onOpenChange={setReportOpen}
        onLoadingChange={setReportLoading}
      />
    </>
  )
}
