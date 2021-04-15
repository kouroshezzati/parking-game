import CellComponent from '../Cell/index';
import { StyledParking } from './StyledParking';
import CarListComponent from './CarList';
import { useSelector } from 'react-redux';
import CounterComponent from './Counter';

const ParkingComponent = () => {
  const cells = useSelector((state) => state.cells);
  const win = useSelector((state) => state.win);
  const time = useSelector((state) => state.time);

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
        <h2 style={{ textAlign: 'center', padding: '10px' }}>
          You won, your time is: {time}
        </h2>
      )}
      <CounterComponent />
    </StyledParking>
  );
};

export default ParkingComponent;
