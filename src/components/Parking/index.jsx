import CellComponent from '../Cell/index';
import { StyledParking } from './StyledParking';
import CarListComponent from './CarList';
import { useSelector } from 'react-redux';

const ParkingComponent = () => {
  const cells = useSelector((state) => state.cells);
  return (
    <StyledParking>
      {cells.map((row, colIndex) => (
        <div style={{ height: '102px' }} key={colIndex}>
          {row.map((cell, rowIndex) => (
            <CellComponent key={rowIndex} {...cell} />
          ))}
        </div>
      ))}
      <CarListComponent />
    </StyledParking>
  );
};

export default ParkingComponent;
