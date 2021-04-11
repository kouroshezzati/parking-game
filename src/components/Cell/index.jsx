import { StyledCell } from './StyledCell';

const CellComponent = ({ col, row, occupied }) => {
  return <StyledCell>{`${col} ${row} ${occupied}`}</StyledCell>;
};

export default CellComponent;
