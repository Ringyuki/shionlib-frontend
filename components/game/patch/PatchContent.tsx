import { KunPatchResourceResponse } from '@/interfaces/patch/patch.interface'
import { PatchItem } from './PatchItem'
import { cn } from '@/utils/cn'
import { Moyu } from './about/Moyu'

interface PatchContentProps {
  patches: KunPatchResourceResponse[]
  className?: string
}

export const PatchContent = ({ patches, className }: PatchContentProps) => {
  return (
    <div className="overflow-y-auto max-w-7xl mx-auto lg:min-w-3xl">
      <div className={cn('flex flex-col gap-2 w-full px-3', className)}>
        {patches
          .filter(patch => patch.type.includes('manual'))
          .sort((a, b) => b.download - a.download)
          // .sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime())
          .map(patch => (
            <PatchItem key={patch.id} patch={patch} />
          ))}
        {patches
          .filter(patch => !patch.type.includes('manual'))
          .sort((a, b) => b.download - a.download)
          // .sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime())
          .map(patch => (
            <PatchItem key={patch.id} patch={patch} />
          ))}
      </div>
      <Moyu />
    </div>
  )
}
