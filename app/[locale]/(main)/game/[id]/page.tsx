import { notFound } from 'next/navigation'
import { shionlibRequest } from '@/utils/shionlib-request'
import { GameData } from '@/interfaces/game/game.interface'
import { GameHeader } from '@/components/game/description/GameHeader'
import { GameContent } from '@/components/game/description/GameContent'
import { CommentContent } from '@/components/common/comment/CommentContent'
import { Comment } from '@/interfaces/comment/comment.interface'
import { PaginatedResponse } from '@/interfaces/api/shionlib-api-res.interface'
import { createGenerateMetadata } from '@/libs/seo/metadata'
import { getPreferredContent } from '@/components/game/description/helpers/getPreferredContent'
import { Ad } from '@/components/common/site/Ad'

const getGameData = async (id: string) => {
  const data = await shionlibRequest().get<GameData>(`/game/${id}`)
  if (!data.data) {
    notFound()
  }
  return data.data
}

const getComments = async (game_id: string) => {
  const data = await shionlibRequest().get<PaginatedResponse<Comment>>(`/comment/game/${game_id}`, {
    params: {
      page: 1,
      pageSize: 50,
    },
  })
  return data.data?.items as Comment[]
}

interface GamePageProps {
  params: Promise<{ id: string }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params
  if (!id || isNaN(Number(id))) {
    notFound()
  }
  const [game, comments] = await Promise.all([getGameData(id), getComments(id)])

  return (
    <div className="flex flex-col gap-8">
      <GameHeader game={game} />
      <GameContent game={game} />
      <Ad id={1} />
      <CommentContent game_id={id} comments={comments} />
    </div>
  )
}

export const generateMetadata = createGenerateMetadata(
  async ({ locale, id }: { locale: string; id: string }) => {
    const game = await getGameData(id)
    const langMap = { en: 'en', ja: 'jp', zh: 'zh' } as const
    const lang = langMap[locale as keyof typeof langMap] ?? 'jp'
    const { title } = getPreferredContent(game, 'title', lang)
    const { cover, aspect } = getPreferredContent(game, 'cover', lang)
    const intro =
      getPreferredContent(game, 'intro', lang)
        .intro.replace(/[\r\n]+/g, ' ')
        .trim()
        .slice(0, 100) + '...'
    return {
      title: title,
      description: intro,
      path: `/game/${id}`,
      og: {
        title: title,
        description: intro,
        image: cover?.url ?? '',
        aspect: aspect === '1 / 1.5' ? '2:3' : aspect === '1.5 / 1' ? '3:2' : '1:1',
      },
    }
  },
)
