import { Platform } from './game.interface'
import { Language } from './game.interface'

export interface GameDownloadResource {
  id: number
  platform: Platform[]
  language: Language[]
  note?: string
  downloads: number
  creator: Creator
  files: GameDownloadResourceFile[]
}

export interface GameDownloadResourceFile {
  id: number
  type: number
  file_status: number
  file_name: string
  file_size: number
  file_url?: string
  s3_file_key?: string
  file_hash: string
  creator: Creator
}

export interface Creator {
  id: number
  name: string
  avatar: string
}

export interface GameDownloadResourceFileLink {
  file_url: string
  expires_in: string
}
