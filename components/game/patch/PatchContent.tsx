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
    <div className="flex flex-col gap-4 overflow-y-auto pb-4">
      <div className={cn('flex flex-col gap-2 max-w-7xl px-3 mx-auto lg:min-w-3xl', className)}>
        {patches
          .filter(patch => patch.type.includes('manual'))
          .sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime())
          .map(patch => (
            <PatchItem key={patch.id} patch={patch} />
          ))}
        {patches
          .filter(patch => !patch.type.includes('manual'))
          .sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime())
          .map(patch => (
            <PatchItem key={patch.id} patch={patch} />
          ))}
      </div>
      <Moyu />
    </div>
  )
}
