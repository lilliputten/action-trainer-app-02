import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Box, ButtonBase, Stack, SxProps } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import Markdown from 'react-markdown';

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

import styles from './GameScreen.module.scss';

const doDebug = isDev && false;
const testingAnswerLayouts = isDev && false;

type TGameScreenProps = TScreenData & TPropsWithClassName;

interface TMemo {
  hasNavigated?: boolean;
}

export const GameScreen: React.FC<TGameScreenProps> = (props) => {
  const memo = React.useMemo<TMemo>(() => ({}), []);
  const {
    // prettier-ignore
    gameId,
    screenId,
    screenData,
  } = props;
  // Eg page url: /game/first/irina/1
  const navigate = useNavigate();
  // Get game data...
  const {
    id,
    // prettier-ignore
    videoUrl,
    answers,
    showComment,
    showQuote,
    showQuestion,
    goTo: screenGoTo,
    answersSx,
    textsSx,
    showQuestionSx,
    showQuoteSx,
    showCommentSx,
    buttonText = 'Продолжить',
  } = screenData;
  const hasVideo = !!videoUrl;
  const answersCount = Array.isArray(answers) ? answers.length : 0;
  const hasAnswers = !!answersCount;
  // const screensCount = scenarioData.screens.length;
  const isLastScreen = !screenGoTo && !hasAnswers; // screenNo === screensCount;
  const showFinalButton = !hasAnswers;
  const finalButtonText = isLastScreen ? 'Завершить' : buttonText;
  // Initialize video ref (to update geometry)...
  const {
    ref: refVideo,
    width: videoContainerWidth,
    height: videoContainerHeight,
  } = useContainerSize<HTMLVideoElement>();
  const videoNode = refVideo.current;
  // const buttonBorderWidth = videoContainerWidth && videoContainerWidth / 100;
  // const buttonBorderRadius = videoContainerWidth && videoContainerWidth / 80;
  const finalButtonBorderWidth = videoContainerWidth && videoContainerWidth / 200;
  const finalTextSize = videoContainerWidth && videoContainerWidth / 25;
  // const finalImageSize = videoContainerWidth && videoContainerWidth / 5;
  const refBox = React.useRef<HTMLDivElement>(null);
  /** Video has already played */
  const [videoComplete, setVideoComplete] = React.useState<boolean>(!hasVideo || doDebug);
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
  // const [hasNavigated, setHasNavigated] = React.useState(false);
  // const [hasInited, setInited] = React.useState(false);
  // DEBUG
  React.useEffect(() => {
    console.log('[GameScreen:DEBUG]', {
      gameId,
      screenId,
      screenData,
      hasAnswers,
      videoComplete,
      isVideoStarted,
      videoEffectComplete,
      isCanPlay,
      isActive,
      isFinished,
      isFinishedComplete,
    });
  }, [
    // prettier-ignore
    gameId,
    screenId,
    screenData,
    hasAnswers,
    videoComplete,
    isVideoStarted,
    videoEffectComplete,
    isCanPlay,
    isActive,
    isFinished,
    isFinishedComplete,
  ]);
  // Update geometry...
  const updateBoxGeometry = React.useCallback(() => {
    const box = refBox.current;
    if (box) {
      const { width, height } = getVideoSizeByRef(refVideo);
      /* console.log('[updateBoxGeometry]', {
       *   width,
       *   height,
       *   box,
       *   // videoContainerWidth,
       *   // videoContainerHeight,
       * });
       */
      if (width && height) {
        box.style.width = px(width);
        box.style.height = px(height);
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
    /* console.log('[GameScreen: Init screen]', {
     *   gameId,
     *   screenId,
     * });
     */
    // setInited(true);
    setTimeout(() => {
      // console.log('[GameScreen: Init screen : setActive]');
      enableCanPlay();
      setActive(true);
    }, animationTime);
  }, [gameId, screenId, enableCanPlay]);
  // Start video handler...
  const startVideoPlay = React.useCallback(() => {
    const video = refVideo.current;
    if (video && hasVideo) {
      /* console.log('[GameScreen] startVideoPlay', {
       *   video,
       *   testingAnswerLayouts,
       * });
       */
      if (!testingAnswerLayouts) {
        video.play();
      }
      updateBoxGeometry();
    }
  }, [refVideo, updateBoxGeometry, hasVideo]);
  // Start and initialize video with a delay...
  const startVideoPlayHandler = React.useRef<NodeJS.Timeout | undefined>(undefined);
  React.useEffect(() => {
    if (isCanPlay) {
      // console.log('[GameScreen: delayed startVideoPlay]');
      if (startVideoPlayHandler.current) {
        clearTimeout(startVideoPlayHandler.current);
      }
      startVideoPlayHandler.current = setTimeout(startVideoPlay, effectTime);
    }
  }, [isCanPlay, startVideoPlay]);
  /* // Set enableCanPlay handler (TODO?)...
   * React.useEffect(() => {
   *   const video = videoNode;
   *   console.log('[GameScreen: Set enableCanPlay handler]', {
   *     video,
   *     // refVideo,
   *   });
   *   if (video) {
   *     video.addEventListener('canplay', enableCanPlay);
   *     return () => {
   *       video?.removeEventListener('canplay', enableCanPlay);
   *     };
   *   }
   * }, [videoNode, enableCanPlay]);
   */
  const handleVideoPlay = React.useCallback(() => {
    setVideoStarted(true);
  }, []);
  const handleVideoEnd = React.useCallback(() => {
    setVideoComplete(true);
    setTimeout(() => {
      setVideoEffectComplete(true);
    }, effectTime);
  }, []);
  const [error, setError] = React.useState<Error>();
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
  /** Final action */
  // React.MouseEventHandler<HTMLButtonElement>
  const handleFinalButtonClick = React.useCallback(() => {
    console.log('[GameScreen:handleFinalButtonClick]');
    setFinished(true);
    // TODO: Store an answer to the store for further analization?
    setTimeout(() => {
      setFinishedComplete(true);
    }, effectTime);
  }, []);
  const handleUserChoice = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const answerIdx = Number(event.currentTarget.id);
      console.log('[GameScreen:handleUserChoice]', {
        answerIdx,
      });
      setAnswerIdx(answerIdx);
      handleFinalButtonClick();
    },
    [handleFinalButtonClick],
  );
  const finalRoute = React.useMemo(() => `/game/${gameId}/finished`, [gameId]);
  const computeNextScreenRoute = React.useCallback(() => {
    if (isLastScreen) {
      return finalRoute;
    }
    if (answers && answerIdx != null) {
      const answer = answers[answerIdx];
      const { goTo: answerGoTo } = answer;
      if (!answerGoTo) {
        return finalRoute;
      }
      return getNextScreenRoute(gameId, answerGoTo, true);
    }
    return getNextScreenRoute(gameId, screenGoTo, true);
  }, [
    // prettier-ignore
    answerIdx,
    answers,
    finalRoute,
    gameId,
    isLastScreen,
    screenGoTo,
  ]);
  React.useEffect(() => {
    const { hasNavigated } = memo;
    console.log('[GameScreen: All effects have finished: before]', {
      hasNavigated,
      // isFinished,
      isFinishedComplete,
      isAnswered,
    });
    if (!hasNavigated && isFinishedComplete && isAnswered) {
      const nextScreenRoute = computeNextScreenRoute();
      console.log('[GameScreen: All effects have finished: navigate]', {
        nextScreenRoute,
      });
      // setHasNavigated(true);
      memo.hasNavigated = true;
      navigate(nextScreenRoute);
    }
  }, [computeNextScreenRoute, isAnswered, isFinishedComplete, memo, navigate]);
  // Generate action buttons using `handleUserChoice`
  const answerButtons = React.useMemo(() => {
    return answers?.map((item, idx) => {
      const { text, buttonSx } = item;
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
          )}
          onClick={handleUserChoice}
          sx={sx}
          // title={text}
        >
          <span className={styles.answerText}>
            <Markdown>{text}</Markdown>
          </span>
        </ButtonBase>
      );
    });
  }, [
    answersSx,
    answerIdx,
    answers,
    handleUserChoice,
    // scenarioId,
    isAnswered,
    // buttonBorderWidth,
    // buttonBorderRadius,
  ]);
  const showContent = !!(showQuote || showComment || showQuestion || showFinalButton);
  if (error) {
    return <ShowError error={error} />;
  }
  return (
    <ScreenWrapper
      screen-id={id}
      className={classNames(
        styles.root,
        (doDebug || videoComplete) && styles.videoComplete,
        (doDebug || videoEffectComplete) && styles.videoEffectComplete,
        (doDebug || isFinished) && styles.finished,
        (doDebug || isAnswered) && styles.answered,
        (doDebug || isActive) && !isFinished && styles.active,
        isFinishedComplete && styles.finishedComplete,
        doDebug && styles.DEBUG,
      )}
    >
      {!isFinishedComplete && (
        <video
          key={['video', gameId, screenId].join('-')}
          src={videoUrl}
          className={styles.video}
          preload="auto"
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          onPlay={handleVideoPlay}
          ref={refVideo}
          // controls
          // autoPlay
          muted
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
                  {showFinalButton && (
                    <ButtonBase
                      className={classNames(styles.finalButton)}
                      title={finalButtonText}
                      onClick={handleFinalButtonClick}
                      sx={{
                        borderWidth: finalButtonBorderWidth,
                        fontSize: finalTextSize,
                        // marginTop: '0.2em',
                      }}
                    >
                      {finalButtonText}
                      <PlayArrow />
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
      <Box className={classNames(styles.curtain)}></Box>
    </ScreenWrapper>
  );
};
