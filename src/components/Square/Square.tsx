import React from 'react';
import './Square.scss';

type SquareProps = {
  value: string;
  isWinnerMove: boolean;
  onClick: () => void;
}

function Square(props: SquareProps) {
  const className = props.isWinnerMove ? 'winner-square' : 'square'
  return (
    <button className={className} onClick={props.onClick} data-testid="square">
      {props.value}
    </button>
  );
}

export default Square;
