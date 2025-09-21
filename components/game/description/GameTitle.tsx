import { Separator } from '@/components/shionui/Separator'

interface GameTitleProps {
  title: string
  excess_titles: string[]
  aliases: string[]
}

export const GameTitle = ({ title, excess_titles, aliases }: GameTitleProps) => {
  return (
    <>
      <div className="text-3xl font-bold flex gap-2">
        <h1>{title}</h1>
      </div>
      {excess_titles.length > 0 && (
        <div className="text-lg font">
          <h1 className="flex items-center flex-wrap">
            {excess_titles.map((t, i) => (
              <span key={`${t}-${i}`} className="flex items-center">
                {i > 0 && (
                  <Separator orientation="vertical" className="mx-2 h-4! hidden md:block" />
                )}
                {t}
              </span>
            ))}
          </h1>
        </div>
      )}
      {aliases.length > 0 && (
        <div className="text-gray-500 font-light">
          <h1>{aliases.join(', ')}</h1>
        </div>
      )}
    </>
  )
}
