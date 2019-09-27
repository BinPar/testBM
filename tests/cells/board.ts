import * as Board from '../../model/board';
import settings from '../../settings';

export default test('Boards', (): void => {
  const currentBoard = Board.getBoard();
  expect(currentBoard.length).toBe(settings.height);
  expect(currentBoard[0].length).toBe(settings.width);  
});
