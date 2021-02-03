import React from 'react';
import './Square.scss';

type SquareProps = {
  value: string;
  isWinnerMove: boolean;
  onClick: () => void;
}

function Square(props: SquareProps) {
  return (
    <button className={props.isWinnerMove ? 'winner-square' : 'square'} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
