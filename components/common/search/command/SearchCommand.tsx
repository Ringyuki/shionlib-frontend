'use client'

import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '@/components/shionui/Command'
import { useTranslations } from 'next-intl'
import { ScrollArea } from '@/components/shionui/ScrollArea'
import { Kbd } from '@/components/shionui/Kbd'
import { CornerDownLeft, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from '@/i18n/navigation.client'
import { useSearchStore } from '@/store/searchStore'

export const SearchCommand = () => {
  const t = useTranslations('Components.Common.Search.Command.SearchCommand')
  const { addHistory, closeSearchDialog, history, deleteAllHistory } = useSearchStore()

  const router = useRouter()
  const [q, setQ] = useState('')
  const handleSelectItem = (item: { id: number; query: string; created_at: string }) => {
    setQ(item.query)
    handleSearch(item.query)
  }
  const handleSearch = (_q?: string) => {
    const query = (_q || q).trim()
    if (query) {
      router.push(`/search/game?q=${query}`)
      closeSearchDialog()
      addHistory({
        id: Date.now(),
        query,
        created_at: new Date().toISOString(),
      })
    }
  }

  const trendingMock = [
    {
      id: 4,
      query: 'Hello',
      created_at: '2021-01-01',
    },
    {
      id: 5,
      query: 'World',
      created_at: '2021-01-02',
    },
    {
      id: 6,
      query: 'Shionlib',
      created_at: '2021-01-03',
    },
  ]
  return (
    <Command>
      <div className="border-4 rounded-xl">
        <CommandInput
          className="border-none bg-secondary rounded-lg mt-1 ml-1 mr-1"
          placeholder={t('placeholder')}
          onValueChange={setQ}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <CommandList className="max-h-[400px] mt-2 my-1">
          <ScrollArea className="h-[400px]">
            {history.length > 0 && (
              <>
                <CommandGroup
                  heading={
                    <span className="flex justify-between">
                      <span>{t('history')}</span>
                      <span
                        className="text-destructive cursor-pointer hover:text-destructive/80 transition-colors flex items-center gap-1"
                        onClick={() => deleteAllHistory()}
                      >
                        <TrashIcon className="size-3" />
                        {t('delete_all')}
                      </span>
                    </span>
                  }
                  className="py-1! px-1!"
                >
                  {history.map(item => (
                    <CommandItem
                      className="border border-transparent data-[selected=true]:border-primary/20"
                      key={item.id}
                      id={item.id}
                      onSelect={() => handleSelectItem(item)}
                    >
                      {item.query}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator className="my-2" />
              </>
            )}
            <CommandGroup heading={t('trending')} className="py-1! px-1! pb-0!">
              {trendingMock.map(item => (
                <CommandItem
                  className="border border-transparent data-[selected=true]:border-primary/20"
                  key={item.id}
                  id={item.id}
                  onSelect={() => handleSelectItem(item)}
                >
                  {item.query}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </CommandList>
        <div className="bg-secondary rounded-b-lg flex items-center gap-1 py-2 px-1 text-xs text-muted-foreground">
          <Kbd>
            <CornerDownLeft />
          </Kbd>
          <span>{t('press_enter_to_search')}</span>
        </div>
      </div>
    </Command>
  )
}
