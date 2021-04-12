import CellComponent from '../Cell/index';
import { StyledParking } from './StyledParking';
import CarListComponent from './CarList';

import { PARKING_HEIGHT, PARKING_WIDTH } from '../../constants';

const ParkingComponent = () => {
  const cells = createCells();
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

const createCells = () => {
  let rows = [];
  for (let i = 0; i < PARKING_HEIGHT; ++i) {
    let cols = [];
    for (let j = 0; j < PARKING_WIDTH; ++j) {
      cols.push({ col: j, row: i, occupied: false });
    }
    rows.push(cols);
  }
  return rows;
};

export default ParkingComponent;
