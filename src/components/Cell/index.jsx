import { StyledCell } from './StyledCell';

const CellComponent = ({ col, row, occupied }) => {
  return <StyledCell occupied={occupied} col={col} row={row}></StyledCell>;
};

export default CellComponent;
