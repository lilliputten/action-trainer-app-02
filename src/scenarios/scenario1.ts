import { SxProps } from '@mui/material';
import { percent, px, vw } from 'src/core/helpers/styles';
import { important } from 'src/core/helpers/styles/SxOpts';
import { EDialogGameType } from 'src/core/types/game/EDialogGameType';
import { TDialogGame } from 'src/core/types/game/TDialogGame';

const finalText = 'Попробуйте пройти тренажер еще раз и отработать другие техники.';

const defaultAnswerSx: SxProps = {
  // borderRadius: '4vmax',
  borderRadius: vw(4, important),
  // borderWidth: '1vmax',
  top: percent(20.5),
  height: percent(31),
  left: percent(8.2),
  width: percent(83),
};

const defaultSecondAnswerSx: SxProps = {
  ...defaultAnswerSx,
  top: percent(53.5),
};

export const dialogGamesList: TDialogGame[] = [
  {
    id: EDialogGameType.Default,
    // startVideoUrl: './scenario-data/videos/1c/1c-0-start.mp4',
    defaultScreenId: '1_start',
    // omitStartGame: true,
    screens: [
      {
        id: 'final',
        videoUrl: './scenario-data/videos/09.mp4',
        showComment: finalText,
      },
      {
        id: '1_start',
        // videoUrl: './scenario-data/videos/start.mp4',
        showComment: 'Начнем с ситуации, когда **врач задерживается и пациент готов подождать**.',
        showCommentSx: {
          fontSize: percent(130),
        },
        // showQuote: 'Начнем с ситуации, когда врач задерживается на 10 минут.',
        buttonText: 'Начать',
        goTo: '1_1',
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
            buttonSx: {
              ...defaultAnswerSx,
              height: percent(30.5),
              // left: percent(0.2),
              // width: percent(46.2),
            },
          },
          {
            text: 'Б. Вера Сергеевна, придется подождать несколько минут. Хорошо? Будете чай, кофе? Полистайте журналы.',
            buttonSx: {
              ...defaultSecondAnswerSx,
              height: percent(25),
              // left: percent(45.7),
              // width: percent(53.5),
            },
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
