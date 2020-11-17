import React from 'react';
import Text from '../text';
import styles from './score.scss';
import { getResults } from '../utilities/results.utilities';

const Score = (props) => {
  const { score } = props;

  return (
    <div className={styles['score']}>
      <div className={styles['score__header']}>
        <Text text="your score:" cases="uppercase" color="dark-blue" weight="bold" />
      </div>
      <div className={styles['score__body']}>
        <Text text={score} size="large" color={getResults(score).color} weight="bold" />
      </div>
    </div>
  );
};

export default Score;