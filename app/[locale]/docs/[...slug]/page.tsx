import { getDocBySlug, getAllDocs, getAdjacentDocs } from '@/libs/docs/getDocs'
import { Link } from '@/i18n/navigation'
import { DocTOC } from '@/components/docs/content/DocTOC'
import { H } from '@/components/docs/content/elements/H'
import { MDXComponents } from 'mdx/types'
import { DocHeader } from '@/components/docs/content/DocHeader'
import { supportedLocales } from '@/config/i18n/supported'
import { DocNav } from '@/components/docs/content/DocNav'

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

const components: MDXComponents = {
  h1: H(1),
  h2: H(2),
  h3: H(3),
  h4: H(4),
  h5: H(5),
  h6: H(6),
}

export default async function DocsPage({ params }: { params: { locale: string; slug: string[] } }) {
  const { slug, locale } = await params
  const { prev, next } = getAdjacentDocs(slug.join('/'), locale)
  const { frontmatter } = getDocBySlug(slug.join('/'), locale)

  let Doc: any
  try {
    Doc = (await import(`@/contents/${locale}/${slug.join('/')}.mdx`)).default
  } catch {
    Doc = (await import(`@/contents/${slug.join('/')}.mdx`)).default
  }
  return (
    <div className="flex w-full">
      <div className="flex-1 flex flex-col gap-4 px-4">
        <DocHeader frontmatter={frontmatter} />
        <article className="shionlib-prose">
          <Doc components={components} />
        </article>
        <DocNav prev={prev} next={next} />
      </div>
      <div className="w-64 hidden lg:block">
        <DocTOC />
      </div>
    </div>
  )
}
