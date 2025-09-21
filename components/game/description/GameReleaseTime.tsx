import { Clock } from 'lucide-react'

interface GameReleaseTimeProps {
  release_date: Date
}

export const GameReleaseTime = ({ release_date }: GameReleaseTimeProps) => {
  return (
    release_date && (
      <div className="flex gap-2 items-center text-gray-500 font-light">
        <Clock className="size-4" />
        <span>{new Date(release_date).toLocaleDateString()?.replace(/\//g, '-')}</span>
      </div>
    )
  )
}
