import styles from '@/styles/playersForm.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function PlayersForm() {
  const [players, setPlayers] = useState({
    firstPlayer: '',
    secondPlayer: ''
  })
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (players.firstPlayer && players.secondPlayer) {
      router.push({
        pathname: '/game',
        query: { 
          firstPlayer: players.firstPlayer,
          secondPlayer: players.secondPlayer
        }
      })
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setPlayers(prev => ({
      ...prev,
      [id === 'first_player' ? 'firstPlayer' : 'secondPlayer']: value
    }))
  }

  return (
    <div className={styles['form-container']}>
      <h1 className={styles['title']}>Tic Tac Toe</h1>
      <form className={styles['players-form']} onSubmit={handleSubmit}>
        <div className={styles['input-group']}>
          <label htmlFor="first_player">First Player: </label>
          <input 
            id="first_player"
            placeholder="Enter name"
            value={players.firstPlayer}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles['input-group']}>
          <label htmlFor="second_player">Second Player: </label>
          <input 
            id="second_player"
            placeholder="Enter name"
            value={players.secondPlayer}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles['start-button']}>Start Game</button>
      </form>
    </div>
  )
}