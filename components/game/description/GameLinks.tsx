import { GameLink } from '@/interfaces/game/game.interface'
import { Button } from '@/components/shionui/Button'
import Link from 'next/link'
import { ExternalLink, Link2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface GameLinksProps {
  link: GameLink[]
}

export const GameLinks = ({ link }: GameLinksProps) => {
  const t = useTranslations('Components.Game.GameLinks')
  const uniqueLink = link.filter((l, index, self) => index === self.findIndex(t => t.url === l.url))
  return (
    <>
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <Link2 />
        <span>{t('links')}</span>
      </h2>
      <div className="flex gap-6">
        {uniqueLink.map(l => (
          <div key={l.id} className="flex items-center">
            <Button appearance="link" intent="neutral" className="p-0">
              <span className="flex items-center gap-2">
                <ExternalLink className="size-4" />
                <Link href={l.url} target="_blank">
                  {l.label}
                </Link>
              </span>
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}
