import {
  PageHeader,
  PageHeaderTitle,
  PageHeaderDescription,
} from '@/components/common/content/PageHeader'
import { Link } from '@/i18n/navigation'

export default function ReleasesPage() {
  return (
    <div className="container mx-auto my-4 space-y-6">
      <PageHeader>
        <PageHeaderTitle title="Latest Releases" />
        <PageHeaderDescription description="Latest game files uploaded by Shionlib users." />
        <PageHeaderDescription
          description={
            <span>
              Every user can upload game files to Shionlib servers. you can follow this{' '}
              <Link
                href="/docs/guides/upload-game-files"
                className="text-primary-500 hover:text-primary-600 transition-colors"
              >
                guide
              </Link>{' '}
              to learn how to upload game files.
            </span>
          }
        />
      </PageHeader>
    </div>
  )
}
