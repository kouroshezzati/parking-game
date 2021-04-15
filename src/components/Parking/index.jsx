import CellComponent from '../Cell/index';
import { StyledParking } from './StyledParking';
import CarListComponent from './CarList';
import { useSelector } from 'react-redux';

const ParkingComponent = () => {
  const cells = useSelector((state) => state.cells);
  const win = useSelector((state) => state.win);
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
      {win && (
        <div style={{ textAlign: 'center', padding: '10px' }}>You won</div>
      )}
    </StyledParking>
  );
};

export default ParkingComponent;
