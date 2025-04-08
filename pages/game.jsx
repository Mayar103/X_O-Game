import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cells from "./components/cells";

export default function Game() {
  const router = useRouter();
  const { firstPlayer, secondPlayer } = router.query;
  const [cells, setCells] = useState(['','','','','','','','','']);
  const [go, setGo] = useState('cross');
  const [message, setMessage] = useState('');

  const winningScenarios = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  const startGame = () => {
    setCells(['','','','','','','','','']);
    setMessage('');
    setGo('cross');
  };

  const changePlayers = () => {
    router.push('/');
  };

  useEffect(() => {
    // Redirect to home if no player names are provided
    if (!firstPlayer || !secondPlayer) {
      router.push('/');
    }
  }, [firstPlayer, secondPlayer, router]);

  useEffect(() => {
    let winnerFound = false;

    winningScenarios.forEach((scenario) => {
      const circleWins = scenario.every((cell) => cells[cell] === 'circle');
      const crossWins = scenario.every((cell) => cells[cell] === 'cross');

      if (circleWins) {
        setMessage(`${secondPlayer} Wins!!`);
        winnerFound = true;
      } else if (crossWins) {
        setMessage(`${firstPlayer} Wins!!`);
        winnerFound = true;
      }
    });

    if (!winnerFound && cells.every((cell) => cell !== '')) {
      setMessage('Draw!');
    }
  }, [cells, firstPlayer, secondPlayer]);

  return (
    <div className="container">
      <div className="player_container">
        <h4 className={!message && go === 'cross' ? 'firstPlayer': ''}>
          {firstPlayer}
        </h4>
      </div>

      <div className="board_with_message">
        <div className="main_board">
          {cells.map((cell, index) => (
            <Cells 
              key={index} 
              id={index} 
              cell={cell} 
              cells={cells} 
              setCells={setCells} 
              go={go} 
              setGo={setGo} 
              message={message}
            />
          ))}
        </div>
        <h5 className="message">{message || "\u00A0"}</h5>
        {message && (
          <div className="button-container">
            <button onClick={startGame} className="new_game">
              Play again
            </button>
            <button onClick={changePlayers} className="change_players">
              Change Players
            </button>
          </div>
        )}
      </div>

      <div className="player_container">
        <h4 className={!message && go === 'circle' ? 'secondPlayer': ''}>
          {secondPlayer}
        </h4>
      </div>
    </div>
  );
}
