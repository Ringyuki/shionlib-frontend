import { Ad } from '@/interfaces/site/ad.interface'
import { supportedLocalesEnum } from '@/config/i18n/supported'

export const ads: Ad[] = [
  {
    id: 1,
    image_zh: 'https://images.yurari.moe/admin/6740325e87e2312f66fa3f58/w3hmpqgv_2.webp',
    aspect: '6.4 / 1',
    link: 'https://s.himoe.uk/ycnbdn',
    excludeLocales: [supportedLocalesEnum.EN, supportedLocalesEnum.JP],
  },
  {
    id: 2,
    image_zh: 'https://images.yurari.moe/admin/6740325e87e2312f66fa3f58/r80vtlci_2.webp',
    aspect: '6 / 1',
    link: 'https://s.himoe.uk/g4mfg8',
    excludeLocales: [supportedLocalesEnum.EN, supportedLocalesEnum.JP],
  },
]
