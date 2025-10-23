import { ZoomImage } from '@/components/common/shared/ZoomImage'

export const Img = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <ZoomImage wrapElement="span" src={src} alt={alt} aspectRatio="16 / 9" className="max-h-128" />
  )
}
