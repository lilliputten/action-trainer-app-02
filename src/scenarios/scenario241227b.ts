import { SxProps } from '@mui/material';
import { percent, vw } from 'src/core/helpers/styles';
import { important } from 'src/core/helpers/styles/SxOpts';
import { EDialogGameType } from 'src/core/types/game/EDialogGameType';
import { TDialogGame } from 'src/core/types/game/TDialogGame';

const defaultAnswerSx: SxProps = {
  fontSize: percent(50),
  borderRadius: vw(2, important),
  top: percent(30),
  height: percent(18),
  left: percent(5),
  width: percent(90),
};
// const smallAnswerLeftSx: SxProps = {
//   ...defaultAnswerSx,
//   top: percent(36),
//   left: percent(5),
//   width: percent(45),
//   height: percent(15),
// };
// const smallAnswerRightSx: SxProps = {
//   ...defaultAnswerSx,
//   top: percent(36),
//   left: percent(48),
//   width: percent(45),
//   height: percent(15),
// };

export const dialogGamesList: TDialogGame[] = [
  {
    id: EDialogGameType.Default,
    // startVideoUrl: './scenario-data/videos/1c/1c-0-start.mp4',
    defaultScreenId: 'start',
    omitStartGame: true,
    useStartScreen: true,
    autoContinue: true,
    screens: [
      {
        id: 'final',
        videoUrl: './scenario-data/videos/07.mp4',
        autoContinue: false,
        buttonText: 'Начать заново',
        goTo: 'start',
      },
      {
        id: 'start',
        videoUrl: './scenario-data/videos/01.mp4',
        answers: [
          {
            text: 'Вариант 1',
            goTo: '02',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(36),
              height: percent(13),
            },
          },
          {
            text: 'Вариант 2',
            goTo: '03',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(49),
              height: percent(13),
            },
          },
          {
            text: 'Вариант 3',
            goTo: '04',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(61.5),
              height: percent(13),
            },
          },
          {
            text: 'Вариант 4',
            goTo: '04',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(74.5),
              height: percent(13),
            },
          },
        ],
      },
      {
        id: '02',
        videoUrl: './scenario-data/videos/02.mp4',
        goTo: '05',
      },
      {
        id: '03',
        videoUrl: './scenario-data/videos/03.mp4',
        goTo: '05',
      },
      {
        id: '04',
        videoUrl: './scenario-data/videos/04.mp4',
        goTo: '05',
      },
      {
        id: '05',
        videoUrl: './scenario-data/videos/05.mp4',
        answers: [
          {
            text: 'Вариант 1',
            goTo: '06',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(36.25),
              height: percent(13),
            },
          },
          {
            text: 'Вариант 2',
            goTo: '06',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(49.25),
              height: percent(13),
            },
          },
          {
            text: 'Вариант 3',
            goTo: '06',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(62.25),
              height: percent(13),
            },
          },
        ],
      },
      {
        id: '06',
        videoUrl: './scenario-data/videos/05.mp4',
        answers: [
          {
            text: 'Вариант 1',
            goTo: 'final',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(36.25),
              height: percent(13),
            },
          },
          {
            text: 'Вариант 2',
            goTo: 'final',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(49),
              height: percent(13),
            },
          },
          {
            text: 'Вариант 3',
            goTo: 'final',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(62),
              height: percent(13),
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
