import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Box, ButtonBase, Typography } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import classNames from 'classnames';

import { effectTime } from 'src/core/assets/scss';
import { ScreenWrapper } from 'src/components/screens/ScreenWrapper';
import {
  // EDialogGameType,
  // dialogGameNames,
  TGameRouterParams,
  defaultDialogGameType,
  dialogGameTypes,
} from 'src/core/types';
import { dialogGamesHash } from 'src/scenario';
import { ShowError } from 'src/components/app/ShowError';
import { useGameData } from 'src/core/hooks/game';

import styles from './StartGamePage.module.scss';
import { GameScreenPage } from '../GameScreenPage';

const showTitle = true;

export const StartGamePage: React.FC = observer(() => {
  const { game: gameId = defaultDialogGameType } = useParams<TGameRouterParams>();
  const error = React.useMemo(() => {
    const isValidGame = !!gameId && dialogGameTypes.includes(gameId) && !!dialogGamesHash[gameId];
    if (!isValidGame) {
      return new Error(`Указана несуществующая игра: ${gameId}`);
    }
  }, [gameId]);
  const [isStarted, setStarted] = React.useState(false);
  const navigate = useNavigate();
  const handleStart = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    setStarted(true);
    setTimeout(() => {
      navigate(`/game/${gameId}/start`);
    }, effectTime);
  }, [gameId, navigate]);
  const gameData = useGameData(gameId);
  const { title, omitStartGame } = gameData;
  const buttonText = 'Начать';
  if (omitStartGame) {
    return <GameScreenPage />;
  }
  return (
    <ScreenWrapper className={classNames(styles.root, isStarted && styles.started)}>
      {!!error && <ShowError className={styles.warningText} error={error} />}
      {!error && (
        <>
          {showTitle && !!title && (
            <Typography
              className={styles.title}
              variant="h2"
              sx={{
                fontSize: '6vw',
                fontWeight: 500,
              }}
            >
              {title}
            </Typography>
          )}
          <ButtonBase className={styles.button} onClick={handleStart}>
            <span>{buttonText}</span>
            <PlayArrow />
          </ButtonBase>
        </>
      )}
      <Box className={styles.curtain}></Box>
    </ScreenWrapper>
  );
});
