import { StyledCell } from './StyledCell';

const CellComponent = ({ col, row, occupied }) => {
  return (
    <StyledCell occupied={occupied}>{`${col} ${row} ${occupied}`}</StyledCell>
  );
};

export default CellComponent;
