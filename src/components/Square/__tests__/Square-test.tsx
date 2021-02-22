import React from "react";
import ReactDOM from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Square from '../Square';

let container: HTMLDivElement | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container!);
  container?.remove();
  container = null;
});

it("renders with value = 0, isWinnerMove = false => textContent = 0, className = square", () => {
  act(() => {
    ReactDOM.render(<Square value={'0'} isWinnerMove={false} onClick={() => {}} />, container);
  });
  const button: HTMLButtonElement = (container as HTMLDivElement).firstChild as HTMLButtonElement;
  expect(button).toBeDefined();
  expect(button.textContent).toBe('0');
  expect(button.className).toBe('square');
});

it("renders with value = 1, isWinnerMove = true => textContent = 1, className = winner-square", () => {
  act(() => {
    ReactDOM.render(<Square value={'1'} isWinnerMove={true} onClick={() => {}} />, container);
  });
  const button: HTMLButtonElement = (container as HTMLDivElement).firstChild as HTMLButtonElement;
  expect(button).toBeDefined();
  expect(button.textContent).toBe('1');
  expect(button.className).toBe('winner-square');
});

it("calls event when clicked", () => {
  const onClick = jest.fn();
  act(() => {
    ReactDOM.render(<Square value={'0'} isWinnerMove={false} onClick={onClick} />, container);
  });
  const button: HTMLButtonElement = (container as HTMLDivElement).firstChild as HTMLButtonElement;

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(onClick).toBeCalledTimes(1);

  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });
  expect(onClick).toBeCalledTimes(6);
});
