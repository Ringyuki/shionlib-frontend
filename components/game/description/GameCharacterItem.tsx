import {
  GameCharacterRelation,
  GameCharacterGenderMap,
  GameCharacterRole,
} from '@/interfaces/game/game.interface'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/shionui/Dialog'
import { Separator } from '@/components/shionui/Separator'
import { FadeImage } from '@/components/common/shared/FadeImage'
import { getPreferredCharacterContent } from './helpers/getPreferredContent'
import { getLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { AudioLines } from 'lucide-react'
import { Badge } from '@/components/shionui/Badge'

interface GameCharacterItemProps {
  character: GameCharacterRelation
}

export const GameCharacterItem = async ({ character }: GameCharacterItemProps) => {
  const locale = await getLocale()
  const langMap = { en: 'en', ja: 'jp', zh: 'zh' } as const
  const lang = langMap[locale as keyof typeof langMap] ?? 'jp'
  const t = await getTranslations('Components.Game.GameCharacterItem')

  const { name } = getPreferredCharacterContent(character.character, 'name', lang)
  const all_names = [
    character.character.name_jp,
    character.character.name_zh,
    character.character.name_en,
  ]
  const excess_names = all_names.filter(t => t !== name).filter(t => !!t)
  const { intro } = getPreferredCharacterContent(character.character, 'intro', lang)

  const roleMap: { [key in GameCharacterRole]: string } = {
    main: t('roleMain'),
    primary: t('rolePrimary'),
    side: t('roleSide'),
    appears: t('roleAppears'),
  } as const
  const roleBadgeColorMap: { [key in GameCharacterRole]: string } = {
    main: 'bg-warning',
    primary: 'bg-primary',
    side: 'bg-accent-foreground',
    appears: 'bg-secondary text-secondary-foreground',
  } as const

  const extra_info_actual = [
    { key: 'gender', value: GameCharacterGenderMap[character.character.gender?.[0] ?? 'a'] },
    { key: 'blood_type', value: character.character.blood_type },
    { key: 'height', value: character.character.height },
    { key: 'weight', value: character.character.weight },
    { key: 'bust', value: character.character.bust },
    { key: 'waist', value: character.character.waist },
    { key: 'hips', value: character.character.hips },
    { key: 'cup', value: character.character.cup },
    { key: 'age', value: character.character.age },
    { key: 'birthday', value: character.character.birthday.join('/') },
  ]
  const extra_info = extra_info_actual
    .map(info => ({
      key: info.key,
      value: info.value,
    }))
    .filter(info => !!info.value)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative rounded-md border-2 border-muted overflow-hidden w-full aspect-[3/4] cursor-pointer bg-card hover:opacity-80 transition-all duration-200">
          {character.image && (
            <FadeImage
              src={character.image}
              alt={name}
              aspectRatio="3 / 4"
              className="object-cover object-top"
            />
          )}
          <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">
            {t('noImage')}
          </div>
          <div className="absolute bottom-0 h-1/3 sm:h-1/4 left-0 w-full bg-gradient-to-t from-black/60 to-transparent">
            <div className="w-full h-full flex flex-col gap-1 justify-end items-start p-2 text-white">
              <div className="font-bold">{name}</div>
              {character.actor && (
                <div className="text-sm flex items-center gap-1">
                  <AudioLines className="size-3" />
                  <span>{character.actor}</span>
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-0 right-0 p-2">
            {character.role && (
              <div className="text-sm flex items-center gap-1">
                <Badge className={roleBadgeColorMap[character.role]}>
                  {roleMap[character.role]}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <DialogTitle>{t('characterDetailDialogTitle')}</DialogTitle>
        <div className="flex flex-col md:flex-row gap-4 w-full h-fit">
          <div
            className="shrink-0 m-auto w-[240px] md:w-[300px] overflow-hidden rounded-md"
            style={{ aspectRatio: '3 / 4' }}
          >
            {character.image ? (
              <FadeImage
                src={character.image}
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
            <h3 className="flex items-center flex-wrap">
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
                dangerouslySetInnerHTML={{ __html: intro.replace(/\n/g, '<br />') }}
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
      </DialogContent>
    </Dialog>
  )
}
