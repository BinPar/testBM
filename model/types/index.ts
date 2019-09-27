export enum CellState {
  empty  = 0b000000,
  mines1 = 0b000001,
  mines2 = 0b000010,
  mines3 = 0b000011,
  mines4 = 0b000100,
  mines5 = 0b000101,
  mines6 = 0b000110,
  mines7 = 0b000111,
  mines8 = 0b001000,
  mines9 = 0b001001,
  isMine = 0b010000,
  opened = 0b100000,
}

export enum GetCellInfo {
  mineNum = 0b001111,
  isMine  = 0b010000,
  opened  = 0b100000,
}

export interface Cell {
  x: number;
  y: number;
  state: CellState;
  stateChangeHandlers: SetCellState[];
}

export type SetCellState = (newState: CellState) => void;

export type Board = Cell[][];
