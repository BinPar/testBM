/* eslint-disable no-param-reassign */
/* eslint-disable operator-assignment */
import { Board, Cell, CellState, GetCellInfo, SetCellState } from '../types';
import settings from '../../settings';

const allCells = new Array<Cell>();

const getInitialBoard = (): Board => {
  const result = new Array<Cell[]>();
  for (let y = 0; y < settings.height; y++) {
    const row = new Array<Cell>();
    result.push(row);
    for (let x = 0; x < settings.height; x++) {
      const cell = {
        state: CellState.empty,
        x,
        y,
        stateChangeHandlers: new Array<SetCellState>(),
      };
      row.push(cell);
      allCells.push(cell);
    }
  }
  return result;
};

export const setCellState = (cell: Cell, state: CellState): void => {
  cell.state = state;
  cell.stateChangeHandlers.forEach((handler): void => {
    handler(state);
  });
};

const currentBoard = getInitialBoard();

export const getBoard = (): Board => {
  return currentBoard;
};


export const getNextCells = (cell: Cell): Cell[] => {
  const result = new Array<Cell>();
  for (
    let y = Math.max(0, cell.y - 1);
    y < Math.min(cell.y + 2, settings.height);
    y++
  ) {
    for (
      let x = Math.max(0, cell.x - 1);
      x < Math.min(cell.x + 2, settings.width);
      x++
    ) {
      result.push(currentBoard[y][x]);
    }
  }
  return result;
};

export const openCell = (cell: Cell): void => {
  setCellState(cell, cell.state | CellState.opened);
  if ((cell.state & GetCellInfo.mineNum) === 0) {
    getNextCells(cell).forEach((colliding): void => {
      if(!(colliding.state & CellState.opened)) {
        openCell(colliding);
      }
    })
  }
}

export const getAllCells = (): Cell[] => {
  return allCells;
};

const clearBoard = (): void => {
  allCells.forEach((cell): void => {
    setCellState(cell, CellState.empty);
  });
};


const addMines = (): void => {
  const cellsWithMiens = allCells
    .sort((): number => Math.random() - 0.5)
    .filter((_, i) => i < settings.totalMines);
  cellsWithMiens.forEach((cell): void => {
    cell.state = cell.state | CellState.isMine;
    getNextCells(cell).forEach((colindan): void => {
      colindan.state += 1;
    });
  });
};

export const resetBoard = (): void => {
  clearBoard();
  addMines();
};

export const getBoardAsText = (): string => {
  let result = '';
  for (let y = 0; y < settings.height; y++) {
    for (let x = 0; x < settings.height; x++) {
      const { state } = currentBoard[y][x];
      if (state & GetCellInfo.isMine) {
        result += 'X';
      } else if (state & GetCellInfo.mineNum) {
        result += (state & GetCellInfo.mineNum).toLocaleString();
      } else {
        result += ' ';
      }
    }
    result += '\n';
  }
  return result;
};

resetBoard();
