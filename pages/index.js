import { useEffect, useState } from "react";
import Cells from "./components/cells";

export default function Home() {
  const [cells, setCells] = useState(['','','','','','','','',''])
  const [go, setGo] = useState('cross');
  const [message, setMessage] = useState('');

  const winningScenarios = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  useEffect(()=>{
    let winnerFound = false; 

    winningScenarios.forEach((winningScenario) => {

      const circleWins = winningScenario.every((cell) => cells[cell] === 'circle')
      const crossWins = winningScenario.every((cell) => cells[cell] === 'cross')

      if(circleWins){
        setMessage('Second Player Wins!!')
        winnerFound = true; 
      }

      else if(crossWins){
        setMessage('First Player Wins!!')
        winnerFound = true;
      }

      if (!winnerFound && cells.every((cell) => cell !== '')) {
        setMessage('Draw!');
    }
    })},[cells])
  
  return (
    <div className="container">

      <div className="player_container">
        <h4 className={!message && go === 'cross' ? 'firstPlayer': ''}>First Player</h4>
      </div>

      <div className="board_with_message">
         <div className="main_board">
         {cells.map((cell, index) => (
          <Cells key={index} id={index} cell={cell} cells={cells} setCells={setCells} go={go} setGo={setGo} message={message}/>
      ))}
        </div>
          <h5 className="message">{message || "\u00A0"}</h5> 
      </div>
       <div className="player_container">
         <h4 className={!message && go === 'circle' ? 'secondPlayer': ''}>Second Player</h4>
       </div>
    </div>
  );
}
