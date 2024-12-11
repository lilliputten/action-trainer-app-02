import { EDialogGameType } from 'src/core/types';
import { useGameData } from './useGameData';

export function useGameTitle(gameId: EDialogGameType) {
  const game = useGameData(gameId);
  return game?.title;
}
