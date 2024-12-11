import { EDialogGameType, dialogGameNames } from 'src/core/types';
import { dialogGamesHash } from 'src/scenario';

export function useGameName(gameId: EDialogGameType) {
  const game = dialogGamesHash[gameId];
  let name = game?.name;
  if (!name) {
    name = dialogGameNames[gameId];
  }
  return name;
}
