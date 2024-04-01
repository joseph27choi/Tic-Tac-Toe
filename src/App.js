import React, { useState } from 'react';
import styled from 'styled-components';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      if (checkWinner(newBoard, currentPlayer)) {
        setWinner(currentPlayer === 'X' ? player1Name : player2Name);
      } else if (newBoard.every(cell => cell !== null)) {
        setWinner('Draw');
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const checkWinner = (board, player) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return winConditions.some(combination => {
      const [a, b, c] = combination;
      return board[a] === player && board[b] === player && board[c] === player;
    });
  };

  return (
    <Container>
      <Title>Face Off</Title>
      <PlayerInputContainer>
        <PlayerInput>
          <label>Player 1 Name:</label>
          <input type="text" value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)} />
        </PlayerInput>
        <PlayerInput>
          <label>Player 2 Name:</label>
          <input type="text" value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)} />
        </PlayerInput>
      </PlayerInputContainer>
      <GameArea>
        <Board>
          {board.map((cell, index) => (
            <Cell key={index} onClick={() => handleCellClick(index)}>
              {cell}
            </Cell>
          ))}
        </Board>
        {winner && (
          <Message>
            {winner === 'Draw' ? 'It\'s a draw!' : `${winner} wins!`}
          </Message>
        )}
      </GameArea>
      <button onClick={resetGame}>Reset Game</button>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const PlayerInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const PlayerInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 10px;

  label {
    margin-bottom: 5px;
  }

  input {
    width: 150px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 5px;
`;

const Cell = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  cursor: pointer;
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 1.5em;
`;
