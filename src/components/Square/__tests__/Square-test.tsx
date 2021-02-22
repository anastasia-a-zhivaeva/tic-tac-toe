import React from "react";
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import Square from '../Square';

afterEach(cleanup)

test("renders with value = 0, isWinnerMove = false => textContent = 0, className = square", () => {
  render(<Square value={'0'} isWinnerMove={false} onClick={() => {}} />);
  const button: HTMLButtonElement = screen.getByRole('button') as HTMLButtonElement;
  expect(button).toBeDefined();
  expect(button.textContent).toBe('0');
  expect(button.className).toBe('square');
});


test("renders with value = 1, isWinnerMove = true => textContent = 1, className = winner-square", () => {
  render(<Square value={'1'} isWinnerMove={true} onClick={() => {}} />);
  const button: HTMLButtonElement = screen.getByRole('button') as HTMLButtonElement;
  expect(button).toBeDefined();
  expect(button.textContent).toBe('1');
  expect(button.className).toBe('winner-square');
});

test("calls event when clicked", () => {
  const onClick = jest.fn();
  render(<Square value={'0'} isWinnerMove={false} onClick={onClick} />);
  const button: HTMLButtonElement = screen.getByRole('button') as HTMLButtonElement;

  fireEvent.click(button);
  expect(onClick).toBeCalledTimes(1);

  for (let i = 0; i < 5; i++) {
    fireEvent.click(button);
  }
  expect(onClick).toBeCalledTimes(6);
});
