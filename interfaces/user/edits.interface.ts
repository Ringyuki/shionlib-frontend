type EditActionType =
  | 'UPDATE_SCALAR'
  | 'ADD_RELATION'
  | 'REMOVE_RELATION'
  | 'SET_RELATION'
  | 'UPDATE_RELATION'

type EditRelationType = 'cover' | 'image' | 'link' | 'developer' | 'character'

export interface GameEntityInfo {
  id: number
  title_jp: string
  title_zh: string
  title_en: string
}

export interface CharacterEntityInfo {
  id: number
  name_jp: string
  name_zh: string | null
  name_en: string | null
}

export interface DeveloperEntityInfo {
  id: number
  name: string
  aliases: string[]
}

interface Actor {
  id: number
  name: string
  avatar: string
}

export type EditRecordItem =
  | {
      id: number
      entity: 'game'
      target_id: number
      action: EditActionType
      field_changes: string[]
      changes: any
      relation_type: EditRelationType | null
      entity_info: GameEntityInfo | null
      actor: Actor | null
      note: string | null
      created: string
      updated: string
    }
  | {
      id: number
      entity: 'character'
      target_id: number
      action: EditActionType
      field_changes: string[]
      changes: any
      relation_type: EditRelationType | null
      entity_info: CharacterEntityInfo | null
      actor: Actor | null
      note: string | null
      created: string
      updated: string
    }
  | {
      id: number
      entity: 'developer'
      target_id: number
      action: EditActionType
      field_changes: string[]
      changes: any
      relation_type: EditRelationType | null
      entity_info: DeveloperEntityInfo | null
      actor: Actor | null
      note: string | null
      created: string
      updated: string
    }
