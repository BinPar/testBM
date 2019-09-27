/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Cell, GetCellInfo } from '../model/types';
import useCellState from '../hooks/useCell';
import { openCell } from '../model/board';

interface CellProps {
  data: Cell;
  style: React.CSSProperties;
}
export default ({ data, style }: CellProps): JSX.Element => {
  const cellState = useCellState(data);
  const cellStyle = { ...style };
  const isOpened = cellState & GetCellInfo.opened;
  const isMine = cellState & GetCellInfo.isMine;
  const collidingMines = (cellState & GetCellInfo.mineNum);
  if (isOpened) {
    cellStyle.backgroundColor = '#4fa';
  } else {
    cellStyle.cursor = 'pointer'
  }
  const onClick = (): void => {
    if (!isOpened) {
      openCell(data);
    }
  };
  let content = '';
  if (isOpened && collidingMines) {
    content = collidingMines.toLocaleString();
  }
  if(isOpened && isMine) {
    cellStyle.backgroundColor = '#f00';
    content = 'X';
  }

  return (
    <div style={cellStyle} onClick={onClick}>
      {content}
    </div>
  );
};
