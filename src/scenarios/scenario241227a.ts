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
const smallAnswerLeftSx: SxProps = {
  ...defaultAnswerSx,
  top: percent(36),
  left: percent(5),
  width: percent(45),
  height: percent(15),
};
const smallAnswerRightSx: SxProps = {
  ...defaultAnswerSx,
  top: percent(36),
  left: percent(48),
  width: percent(45),
  height: percent(15),
};

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
        videoUrl: './scenario-data/videos/12.mp4',
        autoContinue: false,
        buttonText: 'Начать заново',
        goTo: 'start',
      },
      // {
      //   id: 'start',
      //   buttonText: 'Начать',
      //   goTo: '01',
      // },
      {
        id: 'start',
        videoUrl: './scenario-data/videos/01.mp4',
        answers: [
          {
            text: 'Вариант 1',
            goTo: '02',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(22),
              height: percent(13),
            },
          },
          {
            text: 'Вариант 2',
            goTo: '03',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(34.5),
              height: percent(13),
            },
          },
        ],
      },
      {
        id: '02',
        videoUrl: './scenario-data/videos/02.mp4',
        goTo: '04',
      },
      {
        id: '03',
        videoUrl: './scenario-data/videos/03.mp4',
        goTo: '04',
      },
      {
        id: '04',
        videoUrl: './scenario-data/videos/04.mp4',
        answers: [
          // Left column
          {
            text: 'Вариант 1',
            goTo: '05',
            buttonSx: {
              ...smallAnswerLeftSx,
            },
          },
          {
            text: 'Вариант 2',
            goTo: '06',
            buttonSx: {
              ...smallAnswerLeftSx,
              top: percent(48.5),
            },
          },
          {
            text: 'Вариант 3',
            goTo: '07',
            buttonSx: {
              ...smallAnswerLeftSx,
              top: percent(61),
            },
          },
          {
            text: 'Вариант 4',
            goTo: '07',
            buttonSx: {
              ...smallAnswerLeftSx,
              top: percent(74),
            },
          },

          // Right column
          {
            text: 'Вариант 5',
            goTo: '07',
            buttonSx: {
              ...smallAnswerRightSx,
              // top: percent(46.5),
            },
          },
          {
            text: 'Вариант 6',
            goTo: '07',
            buttonSx: {
              ...smallAnswerRightSx,
              top: percent(48.5),
            },
          },
          {
            text: 'Вариант 7',
            goTo: '07',
            buttonSx: {
              ...smallAnswerRightSx,
              top: percent(61),
            },
          },
          {
            text: 'Вариант 8',
            goTo: '07',
            buttonSx: {
              ...smallAnswerRightSx,
              top: percent(74),
            },
          },
        ],
      },
      {
        id: '05',
        videoUrl: './scenario-data/videos/05.mp4',
        goTo: '08',
      },
      {
        id: '06',
        videoUrl: './scenario-data/videos/06.mp4',
        goTo: '08',
      },
      {
        id: '07',
        videoUrl: './scenario-data/videos/07.mp4',
        goTo: '08',
      },
      {
        id: '08',
        videoUrl: './scenario-data/videos/08.mp4',
        goTo: '09',
      },
      {
        id: '09',
        videoUrl: './scenario-data/videos/09.mp4',
        answers: [
          {
            text: 'Вариант 1',
            goTo: '10',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(30),
              height: percent(18),
            },
          },
          {
            text: 'Вариант 2',
            goTo: '10',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(47.5),
              height: percent(15),
            },
          },
          {
            text: 'Вариант 3',
            goTo: '10',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(60),
              height: percent(15),
            },
          },
        ],
      },
      {
        id: '10',
        videoUrl: './scenario-data/videos/10.mp4',
        answers: [
          {
            text: 'Вариант 1',
            goTo: '11',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(36),
              height: percent(13),
              width: percent(94.5),
            },
          },
          {
            text: 'Вариант 2',
            goTo: '11',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(49),
              height: percent(13),
              width: percent(94.5),
            },
          },
          {
            text: 'Вариант 3',
            goTo: '11',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(61.5),
              height: percent(13),
              width: percent(94.5),
            },
          },
          {
            text: 'Вариант 4',
            goTo: '11',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(74.5),
              height: percent(13),
              width: percent(94.5),
            },
          },
        ],
      },
      {
        id: '11',
        videoUrl: './scenario-data/videos/11.mp4',
        answers: [
          {
            text: 'Вариант 1',
            goTo: 'final',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(29.5),
              height: percent(12),
              width: percent(94.5),
            },
          },
          {
            text: 'Вариант 2',
            goTo: 'final',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(39),
              height: percent(18),
              width: percent(94.5),
            },
          },
          {
            text: 'Вариант 3',
            goTo: 'final',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(54.5),
              height: percent(12),
              width: percent(94.5),
            },
          },
          {
            text: 'Вариант 4',
            goTo: 'final',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(64),
              height: percent(12),
              width: percent(94.5),
            },
          },
          {
            text: 'Вариант 5',
            goTo: 'final',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(73.5),
              height: percent(12),
              width: percent(94.5),
            },
          },
          {
            text: 'Вариант 6',
            goTo: 'final',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(83),
              height: percent(12),
              width: percent(94.5),
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
