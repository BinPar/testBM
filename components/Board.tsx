import React from 'react';
import { Cell } from '../model/types';
import { getAllCells } from '../model/board';
import CellUI from './CellUI';
import useWindowSize from '../hooks/useWindowSize';
import settings from '../settings';

export default (): JSX.Element => {
  const size = useWindowSize();
  const cells = getAllCells();
  const side = Math.min(size.width - 40, size.height - 40);
  const getCell = (cell: Cell): JSX.Element => {
    const style: React.CSSProperties = {
      position: 'absolute',
      width: side / settings.width,
      height: side / settings.height,
      border: 'solid 1px black',      
      left: (side / settings.width) * cell.x,
      backgroundColor: '#efe',
      top: (side / settings.height) * cell.y,
      zIndex: cell.x * settings.height + cell.y
    };
    return <CellUI key={`${cell.x}-${cell.y}`} data={cell} style={style} />;
  };
  const style: React.CSSProperties = {
    position: 'absolute',
    left: (size.width - side) / 2,
    top: (size.height - side) / 2,
  };
  return <div style={style}>{cells.map(getCell)}</div>;
};
