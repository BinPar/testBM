import {CellState, GetCellInfo} from '../../model/types';

export default test('Cell State Values', (): void => {
  const state = CellState.mines9 | CellState.opened;
  expect(state & GetCellInfo.mineNum).toBe(9);
  expect(state & GetCellInfo.opened).toBeTruthy();
  expect(state & GetCellInfo.isMine).toBeFalsy();
});
