import { PatchType } from '@/interfaces/patch/patch.interface'

export const TypeMap: Record<string, Partial<PatchType>> = {
  manual: 'manual',
  ai: 'ai',
  machine_polishing: 'machine_polishing',
  machine: 'machine',
  save: 'save',
  crack: 'crack',
  fix: 'fix',
  mod: 'mod',
  other: 'other',
}

export const TypeTokenMap: Record<PatchType, { bg: string; fg: string }> = {
  manual: { bg: 'var(--type-manual)', fg: 'var(--type-manual-fg)' },
  ai: { bg: 'var(--type-ai)', fg: 'var(--type-ai-fg)' },
  machine_polishing: {
    bg: 'var(--type-machine_polishing)',
    fg: 'var(--type-machine_polishing-fg)',
  },
  machine: { bg: 'var(--type-machine)', fg: 'var(--type-machine-fg)' },
  save: { bg: 'var(--type-save)', fg: 'var(--type-save-fg)' },
  crack: { bg: 'var(--type-crack)', fg: 'var(--type-crack-fg)' },
  fix: { bg: 'var(--type-fix)', fg: 'var(--type-fix-fg)' },
  mod: { bg: 'var(--type-mod)', fg: 'var(--type-mod-fg)' },
  other: { bg: 'var(--type-other)', fg: 'var(--type-other-fg)' },
}

export const SUPPORTED_TYPE_MAP: Record<string, string> = {
  manual: '人工翻译补丁',
  ai: 'AI 翻译补丁',
  machine_polishing: '机翻润色',
  machine: '机翻补丁',
  save: '全 CG 存档',
  crack: '破解补丁',
  fix: '修正补丁',
  mod: '魔改补丁',
  other: '其它',
}
