import { GameCharacterItem } from './GameCharacterItem'
import { GameCharacterRelation } from '@/interfaces/game/game.interface'

interface GameCharacterProps {
  characters: GameCharacterRelation[]
}

export const GameCharacter = ({ characters }: GameCharacterProps) => {
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
      {characters.map(character => (
        <GameCharacterItem key={character.character.id} character={character} />
      ))}
    </div>
  )
}
