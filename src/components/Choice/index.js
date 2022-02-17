import {GameButton, GameImage} from './styledComponent'

const Choice = props => {
  const {id, imageUrl, onChoiceSelect} = props

  const setChoice = () => {
    onChoiceSelect(id)
  }

  return (
    <GameButton
      data-testid={`${id.toLowerCase()}Button`}
      type="button"
      className="choiceButton"
      onClick={setChoice}
    >
      <GameImage src={imageUrl} alt={id} />
    </GameButton>
  )
}

export default Choice
