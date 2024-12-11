import { EDialogGameType } from 'src/core/types';
import { dialogGamesHash } from 'src/scenario';

export function useGameData(gameId: EDialogGameType) {
  return dialogGamesHash[gameId];
}
