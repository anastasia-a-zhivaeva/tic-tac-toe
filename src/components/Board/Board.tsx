import React from 'react';
import { SquareHistory } from '../Game';
import Square from '../Square';
import './Board.scss';

type BoardProps = {
  squares: SquareHistory[];
  winnerMoves: number[],
  onClick: (i: number) => void;
};

class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    const isWinnerMove = this.props.winnerMoves.includes(i) ?? false;
    return (
      <Square
        value={this.props.squares[i].symbol}
        key={i}
        isWinnerMove={isWinnerMove}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const array = [...Array(3)];
    return (
      <div data-testid="board">
        {array.map((x, row) => {
          return (<div className="board-row" key={row}>
            {array.map((x, square) => {
              return this.renderSquare(row * 3 + square);
            })}
          </div>);
        })}
      </div>
    );
  }
}

export default Board;
