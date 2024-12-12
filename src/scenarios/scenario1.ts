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
const finalText = `Вы отлично справились! А вот и обещанный бонус – [скрипты по приветствию и маршрутизации пациента](${scriptUrl}). Первое время держите их под рукой. Или пройдите игру несколько раз, и тогда памятки вам не понадобится.`;

const defaultAnswerSx: SxProps = {
  borderRadius: vw(4, important),
  top: percent(13.5),
  height: percent(21),
  left: percent(8.2),
  width: percent(83),
};

const answer1Sx: SxProps = {
  ...defaultAnswerSx,
  top: percent(13.5),
  height: percent(26),
};
const answer2Sx: SxProps = {
  ...defaultAnswerSx,
  top: percent(41.5),
  height: percent(21),
};
const answer3Sx: SxProps = {
  ...defaultAnswerSx,
  top: percent(64.5),
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

      // Part 1

      {
        id: '1_start',
        showComment: 'Начнем с ситуации, когда **пациент пришел по записи**.',
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
            text: 'А. Здравствуйте! Регистратор Ирина. Можно уточнить цель Вашего визита? Чем я могу помочь?',
            buttonSx: {
              ...answer1Sx,
            },
          },
          {
            text: 'Б. Здравствуйте! Меня зовут Ирина. Можно Ваш паспорт?',
            buttonSx: {
              ...answer2Sx,
            },
          },
          {
            text: 'В. Дождаться, когда пациент сам обратится, чтобы не показаться навязчивым.',
            buttonSx: {
              ...answer3Sx,
            },
          },
        ],
      },
      {
        id: '1_1_resume',
        showComment:
          'Начинайте диалог первым. Вежливо поздоровайтесь, представьтесь. Уточните, чем вы можете помочь. Паспорт и другие документы понадобятся позже.',
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
            text: 'А. Можно Ваш паспорт?',
            buttonSx: {
              ...answer1Sx,
              top: percent(15.5),
              height: percent(21),
            },
          },
          {
            isCorrect: true,
            text: 'Б. Подскажите, вы по записи?',
            buttonSx: {
              ...answer2Sx,
              top: percent(39),
              height: percent(21),
            },
          },
          {
            text: 'В. Это ваш первый визит в клинику?',
            buttonSx: {
              ...answer3Sx,
              top: percent(62.5),
              height: percent(21),
            },
          },
        ],
      },
      {
        id: '1_2_resume',
        showComment:
          'Если пациент не сказал об этом сам, уточните, по записи ли он. Остальная информация вам понадобится позже.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '1_3',
      },

      {
        id: '1_3',
        videoUrl: './scenario-data/videos/1_3.mp4',
        goTo: '1_3_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. Уточните, пожалуйста, вашу фамилию и время записи.',
            buttonSx: {
              ...answer1Sx,
              top: percent(15.5),
              height: percent(21),
            },
          },
          {
            text: 'Б. На какое время вы записывались?',
            buttonSx: {
              ...answer2Sx,
              top: percent(39),
              height: percent(21),
            },
          },
          {
            text: 'В. Хорошо, проходите на прием',
            buttonSx: {
              ...answer3Sx,
              top: percent(62.5),
              height: percent(21),
            },
          },
        ],
      },
      {
        id: '1_3_resume',
        showComment: 'Если пациент пришел по записи, уточните его фамилию и время приема.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '1_4',
      },

      {
        id: '1_4',
        videoUrl: './scenario-data/videos/1_4.mp4',
        goTo: '1_4_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            text: 'А. Отлично, у вас будет 410 кабинет.',
            buttonSx: {
              ...answer1Sx,
              top: percent(27.5),
              height: percent(21),
            },
          },
          {
            isCorrect: true,
            text: 'Б. Мария Ивановна, верно?',
            buttonSx: {
              ...answer2Sx,
              top: percent(51),
              height: percent(21),
            },
          },
        ],
      },
      {
        id: '1_4_resume',
        showComment:
          'Услышав, что пациент по записи, проверьте данные в системе. Когда найдете сведения о пациенте, уточните их.',
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

      // Part 2
      {
        id: '2_start',
        showComment:
          'А теперь представим, что **пациент пришел по записи впервые и получает платную медуслугу**.',
        showCommentSx: {
          fontSize: percent(130),
        },
        buttonText: 'Начать',
        goTo: '2_1',
      },
      {
        id: '2_1',
        videoUrl: './scenario-data/videos/1_1.mp4',
        goTo: '2_1_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. Здравствуйте! Регистратор Ирина. Можно уточнить цель Вашего визита? Чем я могу помочь?',
            buttonSx: {
              ...answer1Sx,
            },
          },
          {
            text: 'Б. Здравствуйте! Меня зовут Ирина. Можно Ваш паспорт?',
            buttonSx: {
              ...answer2Sx,
            },
          },
          {
            text: 'В. Дождаться, когда пациент сам обратится, чтобы не показаться навязчивым.',
            buttonSx: {
              ...answer3Sx,
            },
          },
        ],
      },
      {
        id: '2_1_resume',
        showComment:
          'Начинайте диалог первым. Вежливо поздоровайтесь, представьтесь. Уточните, чем вы можете помочь. Паспорт и другие документы понадобятся позже.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_2',
      },
      {
        id: '2_2',
        videoUrl: './scenario-data/videos/1_2.mp4',
        goTo: '2_2_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            text: 'А. Можно Ваш паспорт?',
            buttonSx: {
              ...answer1Sx,
              top: percent(15.5),
              height: percent(21),
            },
          },
          {
            isCorrect: true,
            text: 'Б. Подскажите, вы по записи?',
            buttonSx: {
              ...answer2Sx,
              top: percent(39),
              height: percent(21),
            },
          },
          {
            text: 'В. Это ваш первый визит в клинику?',
            buttonSx: {
              ...answer3Sx,
              top: percent(62.5),
              height: percent(21),
            },
          },
        ],
      },
      {
        id: '2_2_resume',
        showComment:
          'Если пациент не сказал об этом сам, уточните, по записи ли он. Остальная информация вам понадобится позже.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_3',
      },

      {
        id: '2_3',
        videoUrl: './scenario-data/videos/1_3.mp4',
        goTo: '2_3_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. Уточните, пожалуйста, вашу фамилию и время записи.',
            buttonSx: {
              ...answer1Sx,
              top: percent(15.5),
              height: percent(21),
            },
          },
          {
            text: 'Б. На какое время вы записывались?',
            buttonSx: {
              ...answer2Sx,
              top: percent(39),
              height: percent(21),
            },
          },
          {
            text: 'В. Хорошо, проходите на прием',
            buttonSx: {
              ...answer3Sx,
              top: percent(62.5),
              height: percent(21),
            },
          },
        ],
      },
      {
        id: '2_3_resume',
        showComment: 'Если пациент пришел по записи, уточните его фамилию и время приема.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_4',
      },

      {
        id: '2_4',
        videoUrl: './scenario-data/videos/2_4.mp4',
        goTo: '2_4_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. В клинике Вы у нас в первый раз. Будьте добры ваш паспорт, пожалуйста',
            buttonSx: {
              ...answer1Sx,
              top: percent(25),
              height: percent(21),
            },
          },
          {
            text: 'Б. Отлично, у вас будет 410 кабинет. До приема еще 7 минут, можете подождать в холле.',
            buttonSx: {
              ...answer2Sx,
              top: percent(48.5),
              height: percent(26),
            },
          },
        ],
      },
      {
        id: '2_4_resume',
        showComment: 'Когда нашли запись пациента, попросите паспорт.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_5',
      },

      {
        id: '2_5',
        videoUrl: './scenario-data/videos/2_5.mp4',
        goTo: '2_5_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. Мария Ивановна, паспортные данные необходимы, чтобы оформить договор и медкарту.',
            buttonSx: {
              ...answer1Sx,
              top: percent(25),
              height: percent(26),
            },
          },
          {
            text: 'Б. Так положено, без паспортных данных мы не сможем оформить ваш прием.',
            buttonSx: {
              ...answer2Sx,
              top: percent(53),
              height: percent(21.5),
            },
          },
        ],
      },
      {
        id: '2_5_resume',
        showComment:
          'Если пациент спрашивает, зачем нужен паспорт, вежливо разъясните, что данные необходимы для оформления договора и медкарты.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_6',
      },

      {
        id: '2_6',
        videoUrl: './scenario-data/videos/2_6.mp4',
        goTo: '2_6_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. Подскажите ваше полное имя и дату рождения.',
            buttonSx: {
              ...answer1Sx,
              top: percent(27.5),
              height: percent(21),
            },
          },
          {
            text: 'Б. Спасибо, Мария Ивановна.',
            buttonSx: {
              ...answer2Sx,
              top: percent(51),
              height: percent(21),
            },
          },
        ],
      },
      {
        id: '2_6_resume',
        showComment:
          'Когда получили документы, дополнительно идентифицируйте пациента. Уточните ФИО и дату рождения.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_7',
      },

      {
        id: '2_7',
        videoUrl: './scenario-data/videos/2_7.mp4',
        goTo: '2_7_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. Мария Ивановна, сейчас я подготовлю для Вас медицинскую карту, договор и согласие на обработку персональных данных.',
            buttonSx: {
              ...answer1Sx,
              top: percent(19.5),
              height: percent(26),
            },
          },
          {
            text: 'Б. Вот документы, которые нужно подписать. Укажите фамилию, имя, отчество, полную дату рождения и фактический адрес проживания. Внизу поставьте подпись.',
            buttonSx: {
              ...answer2Sx,
              top: percent(47.5),
              height: percent(32),
            },
          },
        ],
      },
      {
        id: '2_7_resume',
        showComment: 'Работая с документами, комментируйте свои действия.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_8',
      },

      {
        id: '2_8',
        videoUrl: './scenario-data/videos/2_8.mp4',
        goTo: '2_8_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            text: 'А. Это информированном согласие на оказание медуслуг. Заполните его, пожалуйста.',
            buttonSx: {
              ...answer1Sx,
              top: percent(17),
              height: percent(26),
            },
          },
          {
            isCorrect: true,
            text: 'Б. В информированном согласии укажите, пожалуйста, фамилию, имя, отчество, полную дату рождения и фактический адрес проживания. Поставьте подпись там, где галочка.',
            buttonSx: {
              ...answer2Sx,
              top: percent(45),
              height: percent(37.5),
            },
          },
        ],
      },
      {
        id: '2_8_resume',
        showComment:
          'Помогите пациенту заполнить добровольное информированное согласие, не отдавайте бланк без устной инструкции.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_9',
      },

      {
        id: '2_9',
        videoUrl: './scenario-data/videos/2_9.mp4',
        goTo: '2_9_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            text: 'А. Это договор на оказание платных медицинских услуг. Его тоже нужно заполнить.',
            buttonSx: {
              ...answer1Sx,
              top: percent(19),
              height: percent(26),
            },
          },
          {
            isCorrect: true,
            text: 'Б. А это договор на оказание платных медицинских услуг. Пожалуйста, поставьте свою подпись в полях, отмеченных галочкой.',
            buttonSx: {
              ...answer2Sx,
              top: percent(47),
              height: percent(33.5),
            },
          },
        ],
      },
      {
        id: '2_9_resume',
        showComment:
          'Объясните, где в договоре поставить подпись, не давайте документ без объяснений.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_10',
      },

      {
        id: '2_10',
        videoUrl: './scenario-data/videos/2_10.mp4',
        goTo: '2_10_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. Мария Ивановна, назовите, пожалуйста, вашу должность и название организации.',
            buttonSx: {
              ...answer1Sx,
              top: percent(27.5),
              height: percent(21.5),
            },
          },
          {
            text: 'Б. Сейчас я дам ваш экземпляр договора, чек и акт об оказании услуг.',
            buttonSx: {
              ...answer2Sx,
              top: percent(51),
              height: percent(21.5),
            },
          },
        ],
      },
      {
        id: '2_10_resume',
        showComment:
          'Заполните медицинскую карту. Для нее уточните, должность и место работы пациента.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_11',
      },

      {
        id: '2_11',
        videoUrl: './scenario-data/videos/2_11.mp4',
        goTo: '2_11_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            text: 'А. Это ваш экземпляр договора, чек и акт об оказании услуг. Терапевт ждет вас в 410 кабинете. К оплате 1800 рублей.',
            buttonSx: {
              ...answer1Sx,
              top: percent(19),
              height: percent(26),
            },
          },
          {
            isCorrect: true,
            text: 'Б. Это ваш экземпляр договора, чек и акт об оказании услуг. Терапевт ждет вас в 410 кабинете. Оплатить сможете после приема.',
            buttonSx: {
              ...answer2Sx,
              top: percent(47),
              height: percent(33.5),
            },
          },
        ],
      },
      {
        id: '2_11_resume',
        showComment:
          'Если пациент пришел на прием к врачу, сообщите, что оплата будет после приема. Принимайте оплату сразу, только если пациент пришел на кардиограмму, УЗИ или анализы.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '2_final',
      },

      {
        id: '2_final',
        videoUrl: './scenario-data/videos/2_final.mp4',
        autoContinue: true,
        goTo: '3_start',
      },

      // Part 3

      {
        id: '3_start',
        showComment: 'Теперь перейдем к более сложному случаю: **пациент пришел без записи**.',
        showCommentSx: {
          fontSize: percent(130),
        },
        buttonText: 'Начать',
        goTo: '3_1',
      },

      {
        id: '3_1',
        videoUrl: './scenario-data/videos/1_1.mp4',
        goTo: '3_1_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. Здравствуйте! Регистратор Ирина. Можно уточнить цель Вашего визита? Чем я могу помочь?',
            buttonSx: {
              ...answer1Sx,
            },
          },
          {
            text: 'Б. Здравствуйте! Меня зовут Ирина. Можно Ваш паспорт?',
            buttonSx: {
              ...answer2Sx,
            },
          },
          {
            text: 'В. Дождаться, когда пациент сам обратится, чтобы не показаться навязчивым.',
            buttonSx: {
              ...answer3Sx,
            },
          },
        ],
      },
      {
        id: '3_1_resume',
        showComment:
          'Начинайте диалог первым. Вежливо поздоровайтесь, представьтесь. Уточните, чем вы можете помочь. Паспорт и другие документы понадобятся позже.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '3_2',
      },

      {
        id: '3_2',
        videoUrl: './scenario-data/videos/3_2.mp4',
        goTo: '3_2_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            text: 'А. Хорошо. Можно Ваш паспорт?',
            buttonSx: {
              ...answer1Sx,
              top: percent(18),
              height: percent(21.5),
            },
          },
          {
            isCorrect: true,
            text: 'Б. Конечно. Можно Ваши документы? Паспорт, полис и СНИЛС.',
            buttonSx: {
              ...answer2Sx,
            },
          },
          {
            text: 'В. Извините, я не могу вас записать к врачу. Сделайте это заранее сами в следующий раз.',
            buttonSx: {
              ...answer3Sx,
              height: percent(21.5),
            },
          },
        ],
      },
      {
        id: '3_2_resume',
        showComment:
          'Иногда пациенты приходят без записи, не отказывайте им. Попросите предоставить паспорт, полис, СНИЛС.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '3_3',
      },

      {
        id: '3_3',
        videoUrl: './scenario-data/videos/3_3.mp4',
        goTo: '3_3_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            isCorrect: true,
            text: 'А. Подскажите ваше полное имя и дату рождения.',
            buttonSx: {
              ...answer1Sx,
              top: percent(27.5),
              height: percent(21.5),
            },
          },
          {
            text: 'Б. Спасибо, Мария Ивановна.',
            buttonSx: {
              ...answer2Sx,
              top: percent(51),
              height: percent(21),
            },
          },
        ],
      },
      {
        id: '3_3_resume',
        showComment:
          'Когда получили документы, дополнительно идентифицируйте пациента. Уточните ФИО и дату рождения.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '3_4',
      },

      {
        id: '3_4',
        videoUrl: './scenario-data/videos/3_4.mp4',
        goTo: '3_4_resume',
        answersSx: {
          fontSize: percent(50),
        },
        answers: [
          {
            text: 'А. Подойдите к стойке. Она стоит у входа. Там нажмите нужную кнопку. Не переживайте, даже бабушки справляются.',
            buttonSx: {
              ...answer1Sx,
              top: percent(21.5),
              height: percent(33),
            },
          },
          {
            isCorrect: true,
            text: 'Б. Давайте я вам помогу. А вы знаете, как пройти к кабинету?',
            buttonSx: {
              ...answer2Sx,
              top: percent(57),
              height: percent(21),
            },
          },
        ],
      },
      {
        id: '3_4_resume',
        showComment: 'Если пациент не умеет самостоятельно брать талон, помогите ему.',
        showCommentSx: {
          fontSize: percent(130),
        },
        goTo: '3_final',
      },

      {
        id: '3_final',
        videoUrl: './scenario-data/videos/3_final.mp4',
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
