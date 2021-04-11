import CellComponent from '../Cell/index';
import { StyledParking } from './StyledParking';
import { PARKING_HEIGHT, PARKING_WIDTH } from '../../constants';

import './style.css';

const ParkingComponent = () => {
  const cells = createCells();
  return (
    <StyledParking>
      {cells.map((row, colIndex) => (
        <div key={colIndex}>
          {row.map((cell, rowIndex) => (
            <CellComponent key={rowIndex} {...cell} />
          ))}
        </div>
      ))}
    </StyledParking>
  );
};

const createCells = () => {
  return Array.from(Array(PARKING_HEIGHT), () => {
    return new Array(PARKING_WIDTH).fill({ occupied: false });
  });
};

export default ParkingComponent;
