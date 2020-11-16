import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import Button from '../button';
import Result from '../result';
import Attempts from '../attempts';
import images from './memory-game.mock';
import styles from './memory-game.scss';

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allImages: [],
      currentCard: {
        id: '',
        name: '',
      },
      previousCard: {
        id: '',
        name: '',
      },
      gameStarted: false,
      foundImages: [],
      score: 0,
      attempts: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    this.timer = null;
  }

  componentDidMount() {
    this.shuffleCards();
  }

  getCardContent(item) {
    const { currentCard, previousCard } = this.state;

    if ((currentCard.id === item.id ||
      previousCard.id === item.id) ||
      this.isFoundCard(item.name)) {
      return item.url;
    }

    return '';
  }

  handleClick(name, id) {
    const {
      currentCard,
      previousCard,
      foundImages,
      score,
      attempts,
    } = this.state;

    const alreadyFound = this.isFoundCard(name);

    // no cards were open
    if (!currentCard.name) {
      this.setState({
        currentCard: {
          id,
          name,
        },
        gameStarted: true,
      });
    }

    // two cards open, matching card found
    if (name === currentCard.name && id !== currentCard.id && !alreadyFound) {
      this.setState({
        currentCard: {
          id,
          name,
        },
        previousCard: {
          id: '',
          name: '',
        },
        foundImages: [...foundImages, name],
        score: score + 1,
        // attempts: attempts + 1,
      });
    }

    // opening the second card
    if (name !== currentCard.name && currentCard.name && !previousCard.name) {
      this.setState({
        currentCard: {
          id,
          name,
        },
        previousCard: {
          id: currentCard.id,
          name: currentCard.name,
        },
        attempts: attempts + 1,
      });
    }

    // two cards open, not matching
    if (name !== currentCard.name && currentCard.name && previousCard.name) {
      this.setState({
        currentCard: {
          id,
          name,
        },
        previousCard: {
          id: '',
          name: '',
        },
      });
    }

    // this.timer = setTimeout(() => {
    //   this.resetCards()
    // }, 700)
  }

  handlePlayButtonClick() {
    this.setState({
      allImages: images.sort(() => Math.random() - 0.5),
      currentCard: {
        id: '',
        name: '',
      },
      previousCard: {
        id: '',
        name: '',
      },
      gameStarted: false,
      foundImages: [],
      score: 0,
      attempts: 0,
    });
  }

  isFoundCard(name) {
    const { foundImages } = this.state;
    return foundImages.includes(name);
  }

  shuffleCards() {
    this.setState({
      allImages: images.sort(() => Math.random() - 0.5),
    });
  }

  createCards(item) {
    return (
      <Column key={item.id}>
        <div className={styles['memory-game__item']}>
          <Card
            id={item.id}
            name={item.name}
            onClick={this.handleClick}
            content={this.getCardContent(item)}
          />
        </div>
      </Column>
    );
  }

  render() {
    console.log(this.state);

    const {
      allImages,
      score,
      attempts,
      gameStarted,
    } = this.state;

    const maxScore = allImages.length / 2;
    const isNewGame = gameStarted ? 'play again' : 'start';

    return (
      <div className={styles['memory-game']}>
        <Row>
          <Column>
            <Button text={isNewGame} onClick={this.handlePlayButtonClick} />
          </Column>
          <Column>
            <div className={styles['memory-game__body']}>
              <Row>
                {allImages.map(item => this.createCards(item))}
              </Row>
            </div>
          </Column>
          <Column>
            <Result result={`${score}/${maxScore}`} />
            <Attempts attempts={attempts} />
          </Column>
        </Row>
      </div>
    );
  }
}

export default MemoryGame;
