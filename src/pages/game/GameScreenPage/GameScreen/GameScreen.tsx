import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Box, ButtonBase, Stack, SxProps } from '@mui/material';
import { PlayArrow, Replay } from '@mui/icons-material';
import Markdown from 'react-markdown';
import { observer } from 'mobx-react-lite';

import { isDev } from 'src/core/constants/config';
import { showError } from 'src/ui/Basic';
import { ScreenWrapper } from 'src/components/screens/ScreenWrapper';
import { TScreenData } from 'src/core/hooks/routes';
import { px } from 'src/core/helpers/styles';
import { getVideoSizeByRef } from 'src/core/helpers/video';
import { useContainerSize } from 'src/ui/hooks';
import { animationTime, effectTime } from 'src/core/assets/scss';
import { getNextScreenRoute } from 'src/core/helpers/routes';
import { TPropsWithClassName } from 'src/core/types';
import { ShowError } from 'src/components/app/ShowError';

import { useAppSessionStore } from 'src/store';
import { useGameData } from 'src/core/hooks/game';

import styles from './GameScreen.module.scss';

const doDebug = isDev && false;
const testingAnswerLayouts = isDev && false;

const answerWaitDelay = 2000;

type TGameScreenProps = TScreenData & TPropsWithClassName;

interface TMemo {
  hasNavigated?: boolean;
  videoStarted?: boolean;
  waitForClick?: boolean;
}

export const GameScreen: React.FC<TGameScreenProps> = observer((props) => {
  const memo = React.useMemo<TMemo>(() => ({}), []);
  const {
    // prettier-ignore
    gameId,
    screenId,
    screenData,
  } = props;
  // Eg page url: /game/first/irina/1
  const navigate = useNavigate();
  // App session
  const appSessionStore = useAppSessionStore();
  const { started } = appSessionStore;
  // Get game data...
  const game = useGameData(gameId);
  const { useStartScreen, autoContinue: gameAutoContinue } = game;
  /* Combined started status: can we start the video or need to wait until click on the start screen? */
  const isStarted = !useStartScreen || started;
  // Get screen data...
  const {
    id,
    videoUrl,
    answers,
    showComment,
    showQuote,
    showQuestion,
    goTo: screenGoTo,
    autoContinue = gameAutoContinue,
    answersSx,
    textsSx,
    showQuestionSx,
    showQuoteSx,
    showCommentSx,
    buttonText = 'Продолжить',
  } = screenData;
  const isAutoContinue = autoContinue; // || gameAutoContinue;
  const hasVideo = !!videoUrl;
  const answersCount = Array.isArray(answers) ? answers.length : 0;
  const hasAnswers = !!answersCount;
  const hasCorrectAnswer = Array.isArray(answers) && answers.find(({ isCorrect }) => isCorrect);
  // const screensCount = scenarioData.screens.length;
  const isLastScreen = false; // !screenGoTo && !hasAnswers; // screenNo === screensCount;
  const showFinalButton = !hasAnswers;
  const isFinal = id === 'final';
  // const finalButtonText = buttonText || (isFinal ? 'Начать заново' : 'Завершить');
  const finalButtonText = isLastScreen ? (isFinal ? 'Начать заново' : 'Завершить') : buttonText;
  // Initialize video ref (to update geometry)...
  const {
    ref: refVideo,
    width: videoContainerWidth,
    height: videoContainerHeight,
  } = useContainerSize<HTMLVideoElement>();
  const videoNode = refVideo.current;
  const finalButtonBorderWidth = videoContainerWidth && videoContainerWidth / 200;
  const finalTextSize = videoContainerWidth && videoContainerWidth / 25;
  const refBox = React.useRef<HTMLDivElement>(null);
  /** Video has already played */
  const [videoComplete, setVideoComplete] = React.useState<boolean>(!hasVideo /* || doDebug */);
  const [isVideoStarted, setVideoStarted] = React.useState(false);
  /** After video effect has finished */
  const [videoEffectComplete, setVideoEffectComplete] = React.useState(false);
  const [isCanPlay, setCanPlay] = React.useState(false);
  const enableCanPlay = React.useCallback(() => setCanPlay(true), []);
  const [isActive, setActive] = React.useState(false);
  const [isFinished, setFinished] = React.useState(false);
  const [isFinishedComplete, setFinishedComplete] = React.useState(false);
  /** Answer */
  const [answerIdx, setAnswerIdx] = React.useState<number | undefined>();
  const isAnswered = videoComplete && (!hasAnswers || answerIdx != null);
  // Update geometry...
  const updateBoxGeometry = React.useCallback(() => {
    const box = refBox.current;
    if (box) {
      const { width, height } = getVideoSizeByRef(refVideo);
      if (width && height) {
        box.style.width = px(width, { important: false });
        box.style.height = px(height, { important: false });
      }
    }
  }, [
    // prettier-ignore
    refBox,
    refVideo,
  ]);
  React.useEffect(updateBoxGeometry, [
    // prettier-ignore
    isVideoStarted,
    videoContainerWidth,
    videoContainerHeight,
    updateBoxGeometry,
    videoNode,
  ]);
  // Init screen...
  React.useEffect(() => {
    setTimeout(() => {
      enableCanPlay();
      setActive(true);
    }, animationTime);
  }, [gameId, screenId, enableCanPlay]);
  // Start video handler...
  const startVideoPlayAction = React.useCallback(() => {
    const video = refVideo.current;
    if (video && !memo.videoStarted) {
      return video.play().then(() => {
        memo.videoStarted = true;
        updateBoxGeometry();
      });
    }
    return Promise.resolve(false);
  }, [refVideo, memo, updateBoxGeometry]);
  const startVideoPlay = React.useCallback(() => {
    const video = refVideo.current;
    if (video && hasVideo && !testingAnswerLayouts) {
      startVideoPlayAction().catch((error) => {
        // NOTE: Handle `play() failed... error (due to inactive page)
        if (error.name === 'NotAllowedError') {
          memo.waitForClick = true;
          // See effect to delayed call `startVideoPlayAction` below
        }
      });
    }
  }, [refVideo, startVideoPlayAction, hasVideo, memo]);
  React.useEffect(() => {
    const eventType = 'mousedown';
    const clickHandler = () => {
      if (memo.waitForClick) {
        startVideoPlayAction();
        memo.waitForClick = false;
        // Remove itself...
        document.body.removeEventListener(eventType, clickHandler);
      }
    };
    document.body.addEventListener(eventType, clickHandler);
    return () => {
      document.body.removeEventListener(eventType, clickHandler);
    };
  }, [memo, startVideoPlayAction]);
  // Start and initialize video with a delay...
  const startVideoPlayHandler = React.useRef<NodeJS.Timeout | undefined>(undefined);
  // Start video
  React.useEffect(() => {
    if (isStarted && isCanPlay) {
      // console.log('[GameScreen: delayed startVideoPlay]');
      if (startVideoPlayHandler.current) {
        clearTimeout(startVideoPlayHandler.current);
      }
      startVideoPlayHandler.current = setTimeout(startVideoPlay, effectTime);
    }
  }, [isStarted, isCanPlay, startVideoPlay]);
  /** Video widget start handler */
  const handleVideoPlay = React.useCallback(() => {
    appSessionStore.setStarted(true);
    setVideoStarted(true);
  }, [appSessionStore]);
  /** Video widget end handler */
  const handleVideoEnd = React.useCallback(() => {
    setVideoComplete(true);
    setTimeout(() => {
      setVideoEffectComplete(true);
    }, effectTime);
  }, []);
  /** Video error */
  const [error, setError] = React.useState<Error>();
  /** Video widget error handler */
  const handleVideoError = React.useCallback(
    (error: unknown) => {
      // eslint-disable-next-line no-console
      console.error('[GameScreen:handleVideoError]', {
        error,
      });
      const nextError = new Error(`Ошибка показа видео ("${videoUrl}")`);
      showError(nextError);
      setError(nextError);
    },
    [videoUrl],
  );
  /** Final action handler */
  const handleFinalButtonClick = React.useCallback(() => {
    // console.log('[GameScreen:handleFinalButtonClick]');
    setFinished(true);
    // TODO: Store an answer to the store for further analization?
    setTimeout(() => {
      setFinishedComplete(true);
    }, effectTime);
  }, []);
  /** Handle user button choice action */
  const handleUserChoice = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const answerIdx = Number(event.currentTarget.id);
      setAnswerIdx(answerIdx);
      setTimeout(handleFinalButtonClick, answerWaitDelay);
    },
    [handleFinalButtonClick],
  );
  /** Prepared next screen route */
  const computeNextScreenRoute = React.useCallback(() => {
    if (isLastScreen) {
      return `/game/${gameId}/start`;
    }
    const answerGoTo = answers && answerIdx != null && answers[answerIdx].goTo;
    return getNextScreenRoute(gameId, answerGoTo || screenGoTo, true);
  }, [
    // prettier-ignore
    answerIdx,
    answers,
    // finalRoute,
    gameId,
    isLastScreen,
    screenGoTo,
  ]);
  // Effect: Go to the next screen
  React.useEffect(() => {
    const { hasNavigated } = memo;
    const goToNext = !hasNavigated && isFinishedComplete && isAnswered;
    if (goToNext) {
      const nextScreenRoute = computeNextScreenRoute();
      memo.hasNavigated = true;
      navigate(nextScreenRoute);
    } else if (isAnswered && isAutoContinue) {
      if (hasAnswers) {
        // Make a delay only had answers...
        setTimeout(handleFinalButtonClick, answerWaitDelay);
      } else {
        handleFinalButtonClick();
      }
    }
  }, [
    computeNextScreenRoute,
    isAnswered,
    isAutoContinue,
    isFinishedComplete,
    memo,
    navigate,
    handleFinalButtonClick,
    hasAnswers,
  ]);
  /** Memoized action buttons (use `handleUserChoice` as an action) */
  const answerButtons = React.useMemo(() => {
    return answers?.map((item, idx) => {
      const { text, isCorrect, buttonSx } = item;
      const key = ['answer-button', idx].join('-');
      const isSelected = answerIdx === idx;
      const sx = { ...answersSx, ...buttonSx } as SxProps;
      return (
        <ButtonBase
          key={key}
          id={String(idx)}
          className={classNames(
            styles.answerButton,
            isSelected && styles.selected,
            isAnswered && styles.answered, // isCorrect && styles.correct,
            isAnswered && isCorrect && styles.correct,
          )}
          onClick={handleUserChoice}
          sx={sx}
          title={text}
        ></ButtonBase>
      );
    });
  }, [answersSx, answerIdx, answers, handleUserChoice, isAnswered]);
  /** Skip video handler */
  const skipVideo = React.useCallback(() => {
    const video = refVideo.current;
    if (video) {
      video.currentTime = video.duration - 1;
    }
    appSessionStore.setStarted(true);
  }, [refVideo, appSessionStore]);
  const showContent = !!(showQuote || showComment || showQuestion || showFinalButton);
  if (error) {
    return <ShowError error={error} />;
  }
  return (
    <ScreenWrapper
      screen-id={id}
      className={classNames(
        styles.root,
        hasCorrectAnswer && styles.hasCorrectAnswer,
        (doDebug || videoComplete) && styles.videoComplete,
        (doDebug || videoEffectComplete) && styles.videoEffectComplete,
        (doDebug || isFinished) && styles.finished,
        (doDebug || isAnswered) && styles.answered,
        (doDebug || isActive) && !isFinished && styles.active,
        isFinishedComplete && styles.finishedComplete,
        doDebug && styles.DEBUG,
      )}
      skipVideo={skipVideo}
      videoComplete={videoComplete}
      videoStarted={isVideoStarted}
    >
      {hasVideo && !isFinishedComplete && (
        <video
          key={['video', gameId, screenId].join('-')}
          src={videoUrl}
          className={styles.video}
          preload="auto"
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          onPlay={handleVideoPlay}
          ref={refVideo}
          controls={isStarted && !videoComplete}
          autoPlay
          // muted
        ></video>
      )}
      <Box className={classNames(styles.overContainer)}>
        <Box
          key={['overBox', gameId, screenId].join('-')}
          ref={refBox}
          className={classNames(styles.overBox)}
          sx={{
            fontSize: finalTextSize,
          }}
        >
          {showContent && (
            <Stack
              className={classNames(styles.overContent)}
              sx={{
                width: '90%',
                fontSize: finalTextSize,
                // gap: finalButtonBorderWidth,
              }}
            >
              {videoComplete && (
                <>
                  <Stack
                    className={classNames(styles.showTexts)}
                    sx={{
                      textAlign: 'center',
                      lineHeight: 1.3,
                      ...textsSx,
                    }}
                  >
                    {!!showQuote && (
                      <Box
                        className={classNames(styles.showQuote)}
                        sx={{
                          ...showQuoteSx,
                        }}
                      >
                        <Markdown>{showQuote}</Markdown>
                      </Box>
                    )}
                    {!!showQuestion && (
                      <Box
                        className={classNames(styles.showQuestion)}
                        sx={{
                          ...showQuestionSx,
                        }}
                      >
                        <Markdown>{showQuestion}</Markdown>
                      </Box>
                    )}
                    {!!showComment && (
                      <Box
                        className={classNames(styles.showComment)}
                        sx={{
                          ...showCommentSx,
                        }}
                      >
                        <Markdown>{showComment}</Markdown>
                      </Box>
                    )}
                  </Stack>
                  {showFinalButton && !isAutoContinue && (
                    <ButtonBase
                      className={classNames(
                        styles.finalButton,
                        // niceFinalButton && styles.nice,
                      )}
                      title={finalButtonText}
                      onClick={handleFinalButtonClick}
                      sx={{
                        borderWidth: finalButtonBorderWidth,
                        fontSize: finalTextSize,
                        // marginTop: '0.2em',
                      }}
                    >
                      {isFinal && <Replay />}
                      <span>{finalButtonText}</span>
                      {!isFinal && <PlayArrow />}
                    </ButtonBase>
                  )}
                </>
              )}
            </Stack>
          )}
          {hasAnswers && (
            <Box className={classNames(styles.overButtons)}>
              {/* Answer buttons */}
              {answerButtons}
            </Box>
          )}
        </Box>
      </Box>
      {useStartScreen && (
        <Stack className={classNames(styles.startScreen, isStarted && styles.started)}>
          <ButtonBase
            className={classNames(styles.startButton)}
            onClick={() => {
              appSessionStore.setStarted(true);
              startVideoPlay();
            }}
            title="Начать"
          >
            <PlayArrow />
          </ButtonBase>
        </Stack>
      )}
      <Box className={classNames(styles.curtain)}></Box>
    </ScreenWrapper>
  );
});
