import { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { Turnstile } from '@/components/common/auth/turnstile/Turnstile'
import { GameDownloadResourceFileLink } from '@/interfaces/game/game-download-resource'
import { shionlibRequest } from '@/utils/shionlib-request'

interface GetDownloadLinkProps {
  fileId: number
  onLink?: (url: string | null) => void
}

export interface GetDownloadLinkHandle {
  requestLink: () => Promise<string | null>
}

export const GetDownloadLink = forwardRef<GetDownloadLinkHandle, GetDownloadLinkProps>(
  ({ fileId, onLink }, ref) => {
    const [downloadLink, setDownloadLink] = useState<string | null>(null)
    const [showTurnstile, setShowTurnstile] = useState(false)
    const pendingResolver = useRef<((url: string | null) => void) | null>(null)

    const fetchDownloadLink = async (token: string): Promise<string | null> => {
      try {
        const res = await shionlibRequest().get<GameDownloadResourceFileLink>(
          `/game/download/${fileId}/link?token=${token}`,
        )
        const url = res.data?.file_url ?? null
        setDownloadLink(url)
        onLink?.(url)
        return url
      } catch (error) {
        onLink?.(null)
        return null
      }
    }

    useImperativeHandle(ref, () => ({
      requestLink: () => {
        if (downloadLink) return Promise.resolve(downloadLink)
        setShowTurnstile(true)
        return new Promise<string | null>(resolve => {
          pendingResolver.current = resolve
        })
      },
    }))

    const handleTurnstileVerify = async (token: string) => {
      const url = await fetchDownloadLink(token)
      pendingResolver.current?.(url)
      pendingResolver.current = null
      setShowTurnstile(false)
    }

    const handleTurnstileError = () => {
      pendingResolver.current?.(null)
      pendingResolver.current = null
      setShowTurnstile(false)
    }

    return showTurnstile ? (
      <Turnstile
        onVerify={handleTurnstileVerify}
        onLoad={() => setShowTurnstile(true)}
        onError={handleTurnstileError}
        onExpire={handleTurnstileError}
      />
    ) : null
  },
)

GetDownloadLink.displayName = 'GetDownloadLink'
