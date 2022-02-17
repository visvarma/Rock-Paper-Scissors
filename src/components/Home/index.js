import {Component} from 'react'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {RiCloseLine} from 'react-icons/ri'

import Choice from '../Choice'

import {
  ScoreContainer,
  ScoreNameContainer,
  ScoreName,
  ScoreBoard,
  ScoreHeading,
  ScoreResult,
  MainContainer,
  RulesView,
  PopUpView,
  PopUpImage,
  GameViewContainer,
  GameImage,
  ResultImageContainer,
  ResultName,
  ResultText,
} from './styledComponent'

import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class Home extends Component {
  state = {
    score: 0,
    gameProgress: true,
    gameResult: [],
    text: '',
  }

  getResult = (item1, item2) => {
    if (item1.id === 'ROCK') {
      switch (item2.id) {
        case 'PAPER':
          return 'YOU LOSE'
        case 'SCISSORS':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else if (item1.id === 'PAPER') {
      switch (item2.id) {
        case 'ROCK':
          return 'YOU WON'
        case 'SCISSORS':
          return 'YOU LOSE'
        default:
          return 'IT IS DRAW'
      }
    } else {
      switch (item2.id) {
        case 'ROCK':
          return 'YOU LOSE'
        case 'PAPER':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    }
  }

  onChoiceSelect = id => {
    const {score} = this.state
    const opponentChoiceItem =
      choicesList[Math.floor(Math.random() * choicesList.length)]
    const [userChoiceItem] = choicesList.filter(
      eachValue => eachValue.id === id,
    )

    const result = this.getResult(userChoiceItem, opponentChoiceItem)
    let newScore = score
    if (result === 'YOU WON') {
      newScore = score + 1
    } else if (result === 'YOU LOSE') {
      newScore = score - 1
    } else {
      newScore = score
    }
    this.setState({
      gameProgress: false,
      gameResult: [userChoiceItem, opponentChoiceItem],
      text: result,
      score: newScore,
    })
  }

  resetGame = () => {
    this.setState({
      gameProgress: true,
      gameResult: [],
      text: '',
    })
  }

  render() {
    const {score, gameProgress, text, gameResult} = this.state

    return (
      <MainContainer>
        <ScoreContainer>
          <ScoreNameContainer>
            <ScoreName>
              ROCK
              <br /> PAPER <br /> SCISSORS
            </ScoreName>
          </ScoreNameContainer>
          <ScoreBoard>
            <ScoreHeading>Score</ScoreHeading>
            <ScoreResult>{score}</ScoreResult>
          </ScoreBoard>
        </ScoreContainer>

        <GameViewContainer>
          {gameProgress ? (
            choicesList.map(choice => (
              <Choice
                id={choice.id}
                imageUrl={choice.imageUrl}
                onChoiceSelect={this.onChoiceSelect}
                key={choice.id}
              />
            ))
          ) : (
            <>
              <ResultImageContainer>
                <ResultName>YOU</ResultName>
                <GameImage src={gameResult[0].imageUrl} alt="your choice" />
              </ResultImageContainer>
              <ResultImageContainer>
                <ResultName>OPPONENT</ResultName>
                <GameImage src={gameResult[1].imageUrl} alt="opponent choice" />
              </ResultImageContainer>
              <ResultImageContainer>
                <ResultText>{text}</ResultText>
                <button
                  className="result-button"
                  type="button"
                  onClick={this.resetGame}
                >
                  PLAY AGAIN
                </button>
              </ResultImageContainer>
            </>
          )}
        </GameViewContainer>
        <RulesView>
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                RULES
              </button>
            }
          >
            {close => (
              <PopUpView>
                <button
                  type="button"
                  className="trigger-button-close"
                  onClick={() => close()}
                >
                  <RiCloseLine />
                </button>
                <PopUpImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </PopUpView>
            )}
          </Popup>
        </RulesView>
      </MainContainer>
    )
  }
}

export default Home
