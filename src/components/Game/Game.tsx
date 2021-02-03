import React from 'react';
import Board from '../Board';
import './Game.scss';

type GameProps = {};

export type SquareHistory = {
  symbol: string;
  col: number;
  row: number;
}

type GameHistory = {
  squares: SquareHistory[];
  index: number;
};

type GameState = {
  history: GameHistory[];
  stepNumber: number;
  xIsNext: boolean;
}

class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill({}),
        index: -1,
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i].symbol) {
      return;
    }
    squares[i] = {
      symbol: this.state.xIsNext ? 'X' : 'O',
      col: i % 3 + 1,
      row: Math.floor(i / 3) + 1,
    };
    this.setState({
      history: history.concat([{
        squares: squares,
        index: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move # ${move} (${step.squares[step.index].col}, ${step.squares[step.index].row})`:
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}



function calculateWinner(squares: SquareHistory[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a].symbol && squares[a].symbol === squares[b].symbol && squares[a].symbol === squares[c].symbol) {
      return squares[a].symbol;
    }
  }
  return null;
}

export default Game;
