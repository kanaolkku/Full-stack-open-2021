import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, });
  const [highest, setHighest] = useState({ anecdote: anecdotes[0], points: 0 })

  const buttonAnecdoteHandleClick = () => {
    const number = randomizeNumber();
    setSelected(number)
  }

  const randomizeNumber = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const buttonVoteHandleClick = () => {
    const copy = { ...points };
    copy[selected] += 1;
    setPoints(copy);

    if (copy[selected] > highest.points) {
      setHighest({ anecdote: anecdotes[selected], points: highest.points += 1 })
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button
        onClick={buttonAnecdoteHandleClick}
        text="next anecdote"
      ></Button>
      <Button
        onClick={buttonVoteHandleClick}
        text="vote"
      ></Button>
      <h1>Anecdote with most votes</h1>
      <p>{highest.anecdote}</p>
      <p>has {highest.points} votes</p>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}
export default App