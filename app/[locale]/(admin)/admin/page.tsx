import { shionlibRequest } from '@/utils/shionlib-request'
import { StatsOverview, StatsTrend, TopGame } from '@/interfaces/admin/stats.interface'
import { StatsCardGrid } from '@/components/admin/dashboard/StatsCardGrid'
import { TrendChart } from '@/components/admin/dashboard/TrendChart'
import { TopGamesTable } from '@/components/admin/dashboard/TopGamesTable'

async function getAdminStats() {
  const [overviewRes, trendsRes, topGamesRes] = await Promise.all([
    shionlibRequest().get<StatsOverview>('/admin/stats/overview'),
    shionlibRequest().get<StatsTrend[]>('/admin/stats/trends', {
      params: { days: 30 },
    }),
    shionlibRequest().get<TopGame[]>('/admin/stats/top-games', {
      params: { pageSize: 10 },
    }),
  ])

  return {
    overview: overviewRes.data,
    trends: trendsRes.data,
    topGames: topGamesRes.data,
  }
}

export default async function AdminDashboardPage() {
  const { overview, trends, topGames } = await getAdminStats()

  return (
    <div className="space-y-6">
      <StatsCardGrid data={overview ?? undefined} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TrendChart data={trends ?? undefined} />
        <TopGamesTable data={topGames ?? undefined} />
      </div>
    </div>
  )
}
