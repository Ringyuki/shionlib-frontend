import { getDocBySlug, getAllDocs, getAdjacentDocs } from '@/libs/docs/getDocs'
import { DocTOC } from '@/components/docs/content/DocTOC'
import { DocHeader } from '@/components/docs/content/DocHeader'
import { supportedLocales } from '@/config/i18n/supported'
import { DocNav } from '@/components/docs/content/DocNav'
import { Mdx } from '@/components/docs/content/MDX'

export function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = []
  for (const locale of supportedLocales) {
    const docs = getAllDocs(locale)
    for (const doc of docs) {
      params.push({ locale, slug: doc.slug.split('/') })
    }
  }
  return params
}
export const dynamicParams = false

interface DocsPageProps {
  params: { locale: string; slug: string[] }
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug, locale } = await params
  const { prev, next } = getAdjacentDocs(slug.join('/'), locale)
  const { frontmatter, content } = getDocBySlug(slug.join('/'), locale)
  return (
    <div className="flex w-full">
      <div className="flex-1 flex flex-col gap-4 px-4">
        <DocHeader frontmatter={frontmatter} />
        <article className="shionlib-prose">
          <Mdx source={content} />
        </article>
        <DocNav prev={prev} next={next} />
      </div>
      <div className="w-64 hidden lg:block">
        <DocTOC />
      </div>
    </div>
  )
}
