import { FileItem } from '@/components/shionui/animated/Files'
import { TreeNode } from '@/interfaces/contents/tree-node.interface'
import { useRouter } from '@/i18n/navigation.client'
import { useTranslations } from 'next-intl'

interface TreeItemProps {
  item: TreeNode
}

export const TreeItem = ({ item }: TreeItemProps) => {
  const router = useRouter()
  const t = useTranslations('Docs')
  return (
    <FileItem
      className="cursor-pointer"
      key={item.name}
      onClick={() => router.push(`/docs/${item.path}`)}
    >
      {t(`${item.path.replace('/', '.')}`)}
    </FileItem>
  )
}
