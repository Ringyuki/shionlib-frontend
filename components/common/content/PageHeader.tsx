import { Separator } from '@/components/shionui/Separator'

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      {children}
      <Separator className="my-6" />
    </div>
  )
}

interface PageHeaderTitleProps {
  title: string
}

const PageHeaderTitle = ({ title }: PageHeaderTitleProps) => {
  return <h1 className="text-3xl font-medium py-2">{title}</h1>
}

interface PageHeaderDescriptionProps {
  description: string
}

const PageHeaderDescription = ({ description }: PageHeaderDescriptionProps) => {
  return <p className="text-muted-foreground py-0.25">{description}</p>
}

export { PageHeader, PageHeaderTitle, PageHeaderDescription }
