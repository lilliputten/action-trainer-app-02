import { percent } from 'src/core/helpers/styles';
import { EDialogGameType } from 'src/core/types/game/EDialogGameType';
import { TDialogGame } from 'src/core/types/game/TDialogGame';

const finalText = 'Попробуйте пройти тренажер еще раз и отработать другие техники.';

export const dialogGamesList: TDialogGame[] = [
  {
    id: EDialogGameType.Default,
    // startVideoUrl: './scenario-data/videos/1c/1c-0-start.mp4',
    defaultScreenId: '1_start',
    screens: [
      {
        id: 'final',
        videoUrl: './scenario-data/videos/09.mp4',
        showComment: finalText,
      },
      {
        id: '1_start',
        // videoUrl: './scenario-data/videos/start.mp4',
        showQuote: 'Начнем с ситуации, когда врач задерживается на 10 минут.',
        buttonText: 'Начать',
        goTo: 'start_3',
      },
      {
        id: '1_1',
        videoUrl: './scenario-data/videos/1_1.mp4',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. Вера Сергеевна, доктор заканчивает прием другого пациента. Мы просим Вас подождать еще 10 минут. Хорошо? Будете чай, кофе? Пожалуйста, журналы для Вас!',
          },
          {
            text: 'Б. Вера Сергеевна, придется подождать несколько минут. Хорошо? Будете чай, кофе? Полистайте журналы.',
          },
        ],
      },
    ],
  },
];

export const dialogGamesHash = dialogGamesList.reduce(
  (hash, game) => {
    hash[game.id] = game;
    return hash;
  },
  {} as Record<EDialogGameType, TDialogGame>,
);
