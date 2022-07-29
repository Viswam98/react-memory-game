import {useState, useEffect} from 'react'
import './App.css'
import SingleCard from './components/SingleCard'


const cardImgs = [
  { "src": "/img/helmet-1.png", matched: false},
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffle = () => {
    const shuffledCards = [ ...cardImgs, ...cardImgs]
      .sort(() => Math.random() - 0.5)
      .map((c) => ({...c, id: Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect( () => {
    shuffle()
  } , [] )

  useEffect(()=>{
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceTwo.src) {
              return {...card, matched: true}
            }
            return card
          })
        })
        resetTurn()
      } else {
        setTimeout(()=>resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffle}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            card = {card}  
            key={card.id}
            handleChoice={handleChoice}
            flipped={ card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App