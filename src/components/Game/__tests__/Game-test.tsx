import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import Game from '../Game';

afterEach(cleanup)

test('renders Board component inside Game', () => {
  render(<Game />);
  const boardComponent = screen.getByTestId('board');
  expect(boardComponent).toBeInTheDocument();
});
