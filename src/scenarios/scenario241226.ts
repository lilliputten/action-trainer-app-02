import { SxProps } from '@mui/material';
import { percent, vw } from 'src/core/helpers/styles';
import { important } from 'src/core/helpers/styles/SxOpts';
import { EDialogGameType } from 'src/core/types/game/EDialogGameType';
import { TDialogGame } from 'src/core/types/game/TDialogGame';

// const finalText = `Спасибо!`;

const defaultAnswerSx: SxProps = {
  fontSize: percent(50),
  borderRadius: vw(2, important),
  top: percent(30),
  height: percent(18),
  left: percent(5),
  width: percent(90),
};

export const dialogGamesList: TDialogGame[] = [
  {
    id: EDialogGameType.Default,
    // startVideoUrl: './scenario-data/videos/1c/1c-0-start.mp4',
    defaultScreenId: 'start',
    omitStartGame: true,
    screens: [
      {
        id: 'final',
        videoUrl: './scenario-data/videos/12.mp4',
        goTo: '01',
      },
      {
        id: 'start',
        // showComment: 'Начнем с ситуации, когда **врач задерживается и пациент готов подождать**.',
        // showCommentSx: {
        //   fontSize: percent(130),
        // },
        buttonText: 'Начать',
        goTo: '01',
      },
      {
        id: '01',
        videoUrl: './scenario-data/videos/01.mp4',
        answers: [
          {
            text: 'Вариант 1',
            goTo: '02',
            buttonSx: {
              ...defaultAnswerSx,
            },
          },
          {
            text: 'Вариант 2',
            goTo: '03',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(46.5),
            },
          },
          {
            text: 'Вариант 3',
            goTo: '04',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(62),
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
            },
          },
          {
            text: 'Вариант 2',
            goTo: '07',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(46.5),
            },
          },
        ],
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
        answers: [
          {
            text: 'Вариант 1',
            goTo: '09',
            buttonSx: {
              ...defaultAnswerSx,
            },
          },
          {
            text: 'Вариант 2',
            goTo: '10',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(46.5),
            },
          },
          {
            text: 'Вариант 3',
            goTo: '11',
            buttonSx: {
              ...defaultAnswerSx,
              top: percent(62),
            },
          },
        ],
      },
      {
        id: '09',
        videoUrl: './scenario-data/videos/09.mp4',
        goTo: '12',
      },
      {
        id: '10',
        videoUrl: './scenario-data/videos/10.mp4',
        goTo: '12',
      },
      {
        id: '11',
        videoUrl: './scenario-data/videos/11.mp4',
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
