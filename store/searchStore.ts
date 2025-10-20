import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { SearchHistory, SearchTrending } from '@/interfaces/search/Search.interface'

interface SearchStore {
  history: SearchHistory[]
  trending: SearchTrending
  setHistory: (history: SearchHistory[]) => void
  setTrending: (trending: SearchTrending) => void
  deleteHistory: (id: number) => void
  deleteAllHistory: () => void
  addHistory: (history: SearchHistory) => void
  searchDialogOpen: boolean
  openSearchDialog: () => void
  closeSearchDialog: () => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      history: [],
      trending: { trending: [], updated_at: '' },
      setHistory: (history: SearchHistory[]) => set({ history }),
      setTrending: (trending: SearchTrending) => set({ trending }),
      deleteHistory: (id: number) =>
        set({ history: get().history.filter(history => history.id !== id) }),
      deleteAllHistory: () => set({ history: [] }),
      addHistory: (history: SearchHistory) =>
        set(state => ({
          history: [history, ...state.history.filter(h => h.query !== history.query)]
            .sort((a, b) => b.created_at.localeCompare(a.created_at))
            .slice(0, 10),
        })),
      searchDialogOpen: false,
      openSearchDialog: () => set({ searchDialogOpen: true }),
      closeSearchDialog: () => set({ searchDialogOpen: false }),
    }),
    {
      name: 'shionlib-search-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
