import { Fields } from '@/interfaces/edit/permisson.interface'
import { GameScalar } from '@/interfaces/edit/game-scalar.interface'

export const pick = (obj: GameScalar, permissionFields: Fields): Partial<GameScalar> => {
  const allowed = new Set(
    Object.keys(permissionFields).filter(k => permissionFields[k as keyof Fields]),
  )

  const result: Partial<GameScalar> = {}
  for (const key of Object.keys(obj) as Array<keyof GameScalar>) {
    if (allowed.has(key as string)) {
      ;(result as Record<keyof GameScalar, GameScalar[keyof GameScalar] | undefined>)[key] =
        obj[key]
    }
  }

  return result
}
