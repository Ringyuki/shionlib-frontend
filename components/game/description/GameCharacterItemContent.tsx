import { GameCharacterRelation } from '@/interfaces/game/game.interface'
import { FadeImage } from '@/components/common/shared/FadeImage'
import { Separator } from '@/components/shionui/Separator'
import { useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'

interface GameCharacterItemContentProps {
  className?: string
  character: GameCharacterRelation
  name: string
  excess_names: string[]
  intro: string
  extra_info: { key: string; value: string }[]
}

export const GameCharacterItemContent = ({
  className,
  character,
  name,
  excess_names,
  intro,
  extra_info,
}: GameCharacterItemContentProps) => {
  const t = useTranslations('Components.Game.Description.GameCharacterItem')
  return (
    <div className={cn('flex flex-col md:flex-row gap-4 w-full h-fit', className)}>
      <div
        className="shrink-0 m-auto w-[240px] md:w-[300px] overflow-hidden rounded-md"
        style={{ aspectRatio: '3 / 4' }}
      >
        {character.image ? (
          <FadeImage
            src={
              character.image.startsWith('http')
                ? character.image
                : process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL + character.image
            }
            alt={name}
            aspectRatio="3 / 4"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground bg-muted/30">
            {t('noImage')}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 flex flex-col gap-2">
        <h3 className="flex items-center flex-wrap md:gap-0 gap-2">
          <span className="font-bold mr-2">{name}</span>
          {excess_names.length > 0 && (
            <>
              {excess_names.map((t, i) => (
                <span key={`${t}-${i}`} className="flex items-center">
                  {i > 0 && (
                    <Separator orientation="vertical" className="mx-2 h-4! hidden md:block" />
                  )}
                  {t}
                </span>
              ))}
            </>
          )}
        </h3>
        <div className="flex flex-col gap-4">
          {character.character.aliases && character.character.aliases.length > 0 && (
            <div className="flex flex-col gap-2 font-light">
              <Separator />
              <span className="flex items-center text-sm">
                {character.character.aliases.join(' / ')}
              </span>
            </div>
          )}
          <div
            className="text-sm break-words break-all"
            dangerouslySetInnerHTML={{
              __html: intro
                .replace(/\n/g, '<br />')
                .replace(/\[b\]/g, '<span class="font-bold">')
                .replace(/\[\/b\]/g, '</span>')
                .replace(
                  /\[spoiler\]/g,
                  '<span class="text-black dark:text-white bg-black dark:bg-white hover:text-white/80 dark:hover:text-black/80 transition-all duration-200">',
                )
                .replace(/\[\/spoiler\]/g, '</span>')
                .replace(
                  /\[mask\]/g,
                  '<span class="text-black dark:text-white bg-black dark:bg-white hover:text-white/80 dark:hover:text-black/80 transition-all duration-200">',
                )
                .replace(/\[\/mask\]/g, '</span>'),
            }}
          />
          {extra_info.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {extra_info.map(info => (
                <div key={info.key} className="flex flex-col gap-1">
                  <div className="text-sm text-gray-500">{t(info.key)}</div>
                  <div className="text-sm">
                    {info.key === 'gender' ? t(info.value as keyof typeof t) : info.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
