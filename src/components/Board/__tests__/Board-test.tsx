import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import { SquareHistory } from '../../Game';
import Board from '../Board';

afterEach(cleanup)

const initialSquares: SquareHistory[] = Array(9).fill({});
const initialWinnerMoves: number[] = [];

test('renders Square components inside Board', () => {
  render(<Board squares={initialSquares} winnerMoves={initialWinnerMoves} onClick={() => {}}/>);
  const squareComponents = screen.getAllByTestId('square');
  expect(squareComponents).toHaveLength(9);
});
