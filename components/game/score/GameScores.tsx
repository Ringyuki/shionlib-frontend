'use client'

import { BangumiScoreCard } from './Bangumi'
import { VNDBScoreCard } from './VNDB'
import { cn } from '@/utils/cn'

interface GameScoresProps {
  className?: string
}

export const GameScores = ({ className }: GameScoresProps) => {
  return (
    <div className={cn('flex gap-2', className)}>
      <BangumiScoreCard />
      <VNDBScoreCard />
    </div>
  )
}
