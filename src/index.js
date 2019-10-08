import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Restart({ onClick }) {
  return (
    <button className="restart" onClick={onClick}>
      Play again
    </button>
  );
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const nextSymbol = isXNext ? "X" : "O";
  const winner = calculateWinner(squares);

  function getStatus() {
    if (winner) {
      return "Winner: " + winner;
    } else if (isBoardFull(squares)) {
      return "Draw!";
    } else {
      return "Next player: " + nextSymbol;
    }
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) {
            return;
          }
          const nextSquares = squares.slice();
          nextSquares[i] = nextSymbol;
          setSquares(nextSquares);

          setIsXNext(!isXNext); // toggle turns
        }}
      />
    );
  }

  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }

  return (
    <div className="container">
      <div className="game">
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
          </div>
          <div className="board-row">
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
          </div>
          <div className="board-row">
            {renderSquare(8)}
            {renderSquare(9)}
            {renderSquare(10)}
            {renderSquare(11)}
          </div>
          <div className="board-row">
            {renderSquare(12)}
            {renderSquare(13)}
            {renderSquare(14)}
            {renderSquare(15)}
          </div>
        </div>
        <div className="game-info">{getStatus()}</div>
        <div className="restart-button">{renderRestartButton()}</div>
      </div>
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const horizontal = [
    [0, 1, 2],
    [1, 2, 3],
    [4, 5, 6],
    [5, 6, 7],
    [8, 9, 10],
    [9, 10, 11],
    [12, 13, 14],
    [13, 14, 15]
  ];
  const vertical = [
    [0, 4, 8],
    [4, 8, 12],
    [1, 5, 9],
    [5, 9, 13],
    [2, 6, 10],
    [6, 10, 13],
    [3, 7, 11],
    [7, 11, 15]
  ];

  const diag = [
    [0, 5, 10],
    [1, 6, 11],
    [3, 6, 9],
    [2, 5, 8],
    [4, 9, 14],
    [5, 10, 15],
    [7, 10, 13],
    [6, 9, 12]
  ];
  const possibleLines = [...diag, ...horizontal, ...vertical];
  // go over all possibly winning lines and check if they consist of only X's/only O's
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}
