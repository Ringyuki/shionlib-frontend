import { Image } from 'lucide-react'
import 'react-medium-image-zoom/dist/styles.css'
import { useTranslations } from 'next-intl'
import { ZoomImage } from '@/components/common/shared/ZoomImage'
import { GameImage } from '@/interfaces/game/game.interface'

interface GameImagesProps {
  images: GameImage[]
}

export const GameImages = ({ images }: GameImagesProps) => {
  const t = useTranslations('Components.Game.Description.GameDetail')

  return (
    images.length > 0 && (
      <>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Image />
          <span>{t('images')}</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {images.map(image => (
            <ZoomImage key={image.url} src={image.url} alt={image.url} aspectRatio="16 / 9" />
          ))}
        </div>
      </>
    )
  )
}
