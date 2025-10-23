import { getAllDocs } from '@/libs/docs/getDocs'
import { DocCard } from '@/components/docs/DocCard'
import { Masonry } from '@/components/common/shared/Masonry'

interface DocsPageProps {
  params: Promise<{ locale: string }>
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { locale } = await params
  const docs = getAllDocs(locale)
  return (
    <Masonry columnCountBreakpoints={{ default: 1, sm: 2, md: 3, lg: 3 }} rowGap={8}>
      {docs.map(doc => (
        <div key={doc.slug} className="break-inside-avoid">
          <DocCard doc={doc} />
        </div>
      ))}
    </Masonry>
  )
}
