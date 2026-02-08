import { FileUpload, FileUploadDropzone, FileUploadTrigger } from '@/components/shionui/FileUpload'
import { Upload as UploadIcon, LoaderCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  ANIMETRACE_API_URL,
  ANIMETRACE_MODEL,
  ALLOWED_ANIMETRACE_FILE_EXTENSIONS,
} from './constant/animetrace.constant'
import { toast } from 'react-hot-toast'
import { AnimeTraceResponse } from '@/interfaces/search/anime-trace.interface'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/utils/cn'
import { AnimeTraceResult } from './Result'
import { prepareBitmap } from './constant/get-target-box'

export const AnimeTraceSearch = () => {
  const t = useTranslations('Components.Common.Search.AnimeTrace.Search')
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [image, setImage] = useState<ImageBitmap | null>(null)
  const [result, setResult] = useState<AnimeTraceResponse | null>(null)

  const handleSearch = useCallback(
    async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('model', ANIMETRACE_MODEL)
      setLoading(true)
      const loadingToast = toast.loading(t('loading'))
      await fetch(ANIMETRACE_API_URL, {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(async (data: AnimeTraceResponse) => {
          console.log(data)
          setResult(data)
          if (data.code !== 0) throw new Error(data.zh_message)

          if (!data.data.length) {
            toast.error(t('noResult'))
            setImage(null)
          } else {
            const bmp = await prepareBitmap(file)
            console.log(bmp)
            setImage(bmp)
          }
        })
        .catch(error => {
          toast.error(error.message)
        })
        .finally(() => {
          setLoading(false)
          toast.dismiss(loadingToast)
        })
    },
    [t],
  )

  const handleFileAccept = useCallback(
    async (files: File[]) => {
      setFile(files[0])
      await handleSearch(files[0])
      setFile(null)
    },
    [handleSearch],
  )

  useEffect(() => {
    const handlePaste = async (event: ClipboardEvent) => {
      if (loading) return
      const items = event.clipboardData?.items
      if (!items || items.length === 0) return

      const imageItem = Array.from(items).find(item => item.type.startsWith('image/'))
      if (!imageItem) return
      const pastedFile = imageItem.getAsFile()
      if (!pastedFile) return

      const ext = pastedFile.name.split('.').pop()?.toLowerCase()
      const allowedExts = ALLOWED_ANIMETRACE_FILE_EXTENSIONS.map(e => e.replace('.', ''))
      if (!ext || !allowedExts.includes(ext)) {
        toast.error(t('invalidFileFormat'))
        return
      }
      setFile(pastedFile)
      await handleSearch(pastedFile)
      setFile(null)
    }
    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [handleSearch, loading, t])

  return (
    <div className="space-y-4">
      <FileUpload
        className="gap-0"
        value={file ? [file] : []}
        accept={ALLOWED_ANIMETRACE_FILE_EXTENSIONS.join(',')}
        maxFiles={1}
        onAccept={handleFileAccept}
      >
        <FileUploadDropzone className="relative">
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center bg-black/50 rounded-md transition-opacity duration-300',
              loading ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
          >
            <LoaderCircle className="size-6 animate-spin text-white" />
          </div>
          <div className="text-muted-foreground text-sm flex flex-col items-center gap-2">
            <UploadIcon className="size-4" />
            <span>{t('dropzone')}</span>
            <span>{t('dropzoneSupportFileFormat')}</span>
          </div>
        </FileUploadDropzone>
        <FileUploadTrigger />
      </FileUpload>
      {result && result.data.length > 0 && image && (
        <AnimeTraceResult result={result} image={image} />
      )}
    </div>
  )
}
