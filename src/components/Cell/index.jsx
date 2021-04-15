import { StyledCell } from './StyledCell';

const CellComponent = ({ col, row, occupied }) => {
  return (
    <StyledCell occupied={occupied}></StyledCell>
  );
};

export default CellComponent;
