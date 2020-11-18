import React from 'react';
import styles from './levels.scss';
import LevelButton from '../level-button';

const Levels = (props) => {
  const { levels, onClick } = props;

  return (
    <div className={styles.levels}>
      {levels.map(level => (
        <LevelButton
          key={level.id}
          onClick={onClick}
          level={level}
        />
      ))}
    </div>
  );
};

export default Levels;
