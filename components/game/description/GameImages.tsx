import { Image } from 'lucide-react'
import { FadeImage } from '@/components/common/shared/FadeImage'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

interface GameImagesProps {
  images: string[]
}

export const GameImages = ({ images }: GameImagesProps) => {
  const t = useTranslations('Components.Game.GameDetail')

  const handleZoomChange = (isZoomed: boolean) => {
    try {
      const body = document.body
      if (isZoomed) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        body.setAttribute('data-scroll-locked', 'true')
        body.style.setProperty('--removed-body-scroll-bar-size', `${scrollbarWidth}px`)
      }
    } catch {}
  }

  const ZoomContentInner = ({ data }: { data: any }) => {
    const { modalState, img, buttonUnzoom } = data
    useEffect(() => {
      if (modalState === 'UNLOADED') {
        try {
          const body = document.body
          body.removeAttribute('data-scroll-locked')
          body.style.removeProperty('--removed-body-scroll-bar-size')
        } catch {}
      }
    }, [modalState])
    return (
      <>
        {img}
        {buttonUnzoom}
      </>
    )
  }

  const renderZoomContent = (data: any) => <ZoomContentInner data={data} />
  return (
    images.length > 0 && (
      <>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Image />
          <span>{t('images')}</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {images.map(image => (
            <Zoom
              key={image}
              classDialog="rmiz-dialog"
              onZoomChange={handleZoomChange}
              ZoomContent={renderZoomContent}
            >
              <FadeImage
                src={image}
                alt={image}
                className="w-full h-full rounded-md"
                aspectRatio="16 / 9"
              />
            </Zoom>
          ))}
        </div>
      </>
    )
  )
}
