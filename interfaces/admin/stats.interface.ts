export interface StatsOverview {
  totalGames: number
  totalUsers: number
  totalDownloads: number
  totalViews: number
  totalCharacters: number
  totalDevelopers: number
  totalComments: number
  newGamesToday: number
  newUsersToday: number
}

export interface StatsTrend {
  date: string
  games: number
  users: number
  downloads: number
  views: number
}

export interface TopGame {
  id: number
  title_jp: string
  title_zh: string
  title_en: string
  cover?: string
  views: number
  downloads: number
  hot_score: number
}
