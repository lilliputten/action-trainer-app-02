import { SxProps } from '@mui/material';
import {
  percent,
  // px,
  vw,
} from 'src/core/helpers/styles';
import { important } from 'src/core/helpers/styles/SxOpts';
import { EDialogGameType } from 'src/core/types/game/EDialogGameType';
import { TDialogGame } from 'src/core/types/game/TDialogGame';

const scriptUrl = `./scenario-data/${process.env.SCENARIO_ID}script.docx`;
const finalText = `Вы отлично справились! В качестве вознаграждения забирайте [скрипт для медрегистратора](${scriptUrl}), если врач задерживается. Пройдите тренажер несколько раз и тогда он вам не понадобится.`;

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
    omitStartGame: true,
    screens: [
      {
        id: 'final',
        // videoUrl: './scenario-data/videos/09.mp4',
        showComment: finalText,
        showCommentSx: {
          fontSize: percent(100),
        },
      },
      {
        id: '1_start',
        showComment: 'Начнем с ситуации, когда **врач задерживается и пациент готов подождать**.',
        showCommentSx: {
          fontSize: percent(130),
        },
        buttonText: 'Начать',
        goTo: '1_1',
      },
      {
        id: '1_1',
        videoUrl: './scenario-data/videos/1_1.mp4',
        goTo: '1_1_resume',
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
            },
          },
          {
            text: 'Б. Вера Сергеевна, придется подождать несколько минут. Хорошо? Будете чай, кофе? Полистайте журналы.',
            buttonSx: {
              ...defaultSecondAnswerSx,
              height: percent(25),
            },
          },
        ],
      },
      {
        id: '1_1_resume',
        showComment:
          'Объясните причину задержки специалиста и вежливо предложите кофе, чай и журналы.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '1_2',
      },
      {
        id: '1_2',
        videoUrl: './scenario-data/videos/1_2.mp4',
        goTo: '1_2_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            text: 'А. Врач вас ожидает. Можете идти.',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(27.5),
              height: percent(21),
              width: percent(83.5),
            },
          },
          {
            isCorrect: true,
            text: 'Б. Проходите, пожалуйста, кабинет номер 3. Прямо по коридору и направо.',
            buttonSx: {
              ...defaultSecondAnswerSx,
              top: percent(51),
              height: percent(21),
              width: percent(83.5),
            },
          },
        ],
      },
      {
        id: '1_2_resume',
        showComment:
          'Если нет возможности проводить пациента – вежливо проговорите, как пройти к кабинету.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '1_final',
      },
      {
        id: '1_final',
        videoUrl: './scenario-data/videos/1_final.mp4',
        autoContinue: true,
        goTo: '2_start',
      },
      {
        id: '2_start',
        showComment:
          'Теперь рассмотрим более сложный случай: когда **врач задерживается и пациент не готов подождать**.',
        showCommentSx: {
          fontSize: percent(130),
        },
        buttonText: 'Начать',
        goTo: '2_1',
      },
      {
        id: '2_1',
        videoUrl: './scenario-data/videos/2_1.mp4',
        goTo: '2_2',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. …Простите, пожалуйста! У Вас есть возможность подождать?',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(27.5),
              height: percent(21),
              width: percent(83.5),
            },
          },
          {
            text: 'Б. …Вам нужно подождать.',
            buttonSx: {
              ...defaultSecondAnswerSx,
              top: percent(51),
              height: percent(21),
              width: percent(83.5),
            },
          },
        ],
      },
      {
        id: '2_2',
        videoUrl: './scenario-data/videos/2_2.mp4',
        goTo: '2_2_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            text: 'А. …Приходите к нам в другой раз. Такие случаи – редкость. Больше не повторится.',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(25),
              height: percent(21),
              width: percent(83.5),
            },
          },
          {
            isCorrect: true,
            text: 'Б. Проходите, пожалуйста, кабинет номер 3. Прямо по коридору и направоБ. Могу я предложить Вам записаться на другой день? Мы подберем максимально удобное для Вас время.',
            buttonSx: {
              ...defaultSecondAnswerSx,
              top: percent(48.5),
              height: percent(25.5),
              width: percent(83.5),
            },
          },
        ],
      },
      {
        id: '2_2_resume',
        showComment:
          'Разговаривайте вежливо. Предложите пациенту запись на другой день. Не гарантируйте того, что не можете точно знать.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_final',
      },
      {
        id: '2_final',
        videoUrl: './scenario-data/videos/2_final.mp4',
        autoContinue: true,
        goTo: 'final',
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
