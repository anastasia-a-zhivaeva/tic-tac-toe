import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import App from '../App';

afterEach(cleanup)

test('renders Game component inside App', () => {
  render(<App />);
  const gameComponent = screen.getByTestId('game');
  expect(gameComponent).toBeInTheDocument();
});
