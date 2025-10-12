import { Image } from 'lucide-react'
import 'react-medium-image-zoom/dist/styles.css'
import { useTranslations } from 'next-intl'
import { ZoomImage } from '@/components/common/shared/ZoomImage'
import { GameImage } from '@/interfaces/game/game.interface'
import { Spoiler } from '@/components/shionui/Spoiler'
import { ContentLimit } from '@/interfaces/user/user.interface'

interface GameImagesProps {
  images: GameImage[]
  content_limit?: ContentLimit
}

const _GameImage = ({ image }: { image: GameImage }) => {
  return (
    <ZoomImage
      key={image.url}
      src={
        image.url.startsWith('http')
          ? image.url
          : process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL + image.url
      }
      alt={image.url}
      aspectRatio="16 / 9"
    />
  )
}

export const GameImages = ({ images, content_limit }: GameImagesProps) => {
  const t = useTranslations('Components.Game.Description.GameDetail')

  return (
    images.length > 0 && (
      <>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Image />
          <span>{t('images')}</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {images.map(image => {
            if (image.sexual > 0) {
              if (content_limit === ContentLimit.SHOW_WITH_SPOILER)
                return (
                  <Spoiler key={image.url} blur={32}>
                    <_GameImage image={image} />
                  </Spoiler>
                )
              if (content_limit === ContentLimit.JUST_SHOW)
                return <_GameImage key={image.url} image={image} />
            }
            return <_GameImage image={image} key={image.url} />
          })}
        </div>
      </>
    )
  )
}
