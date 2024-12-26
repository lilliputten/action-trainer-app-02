import { dialogGamesHash } from 'src/scenario';
import { useScreenParams } from 'src/core/hooks/routes';

import { TDialogScreenId } from 'src/core/types';
import { EDialogGameType, defaultDialogGameType } from 'src/core/types/game/EDialogGameType';
import { TDialogGame, TDialogScreen } from 'src/core/types/game/TDialogGame';

export interface TScreenData {
  gameId: EDialogGameType;
  screenId: TDialogScreenId;
  gameData: TDialogGame;
  screenData: TDialogScreen;
}

export function useScreenData() {
  const params = useScreenParams();
  const gameId = params.gameId || defaultDialogGameType;
  if (!gameId) {
    throw new Error(`Не указана игра!`);
  }
  const gameData = dialogGamesHash[gameId];
  if (!gameData) {
    throw new Error(`Игры '${gameId}' не существует.`);
  }
  const screenId = params.screenId || gameData.defaultScreenId;
  const {
    screens,
    // scenarios,
  } = gameData;
  const foundScreen = screens.find((screen) => screenId === screen.id);
  if (!foundScreen) {
    const error = new Error(`Не найден экран "${screenId}" для сценария "${gameId}"`);
    // eslint-disable-next-line no-console
    console.error('[GameScreenPage:useScreenData]', error.message, {
      // scenarioData,
      gameData,
      screenId,
      // scenarioId,
      gameId,
      error,
    });
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
  const result: TScreenData = {
    gameId,
    screenId,
    gameData,
    screenData: foundScreen,
    // scenarioId,
    // scenarioData,
  };
  /* console.log('[useScreenData]', {
   *   result,
   *   gameId,
   *   screenId,
   *   gameData,
   *   foundScreen,
   *   // scenarioId,
   *   // scenarioData,
   * });
   */
  return result;
}
