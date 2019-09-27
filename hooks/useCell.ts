/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { CellState, Cell } from '../model/types';

const useCellState = (cell: Cell): CellState => {
  const [state, setState] = useState<CellState>(cell.state);
  
  useEffect(() => {
    cell.stateChangeHandlers.push(setState);
    return (): void => {
      cell.stateChangeHandlers = cell.stateChangeHandlers.filter((handler): boolean => handler !== setState);
    }
  }, []);
  
  return state;
};

export default useCellState;
