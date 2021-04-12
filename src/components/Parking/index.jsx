import CellComponent from '../Cell/index';
import { StyledParking } from './StyledParking';
import { PARKING_HEIGHT, PARKING_WIDTH } from '../../constants';

import CarComponent from '../Car';

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
      <CarComponent
        name="black"
        col={1}
        row={0}
        size={2}
        direction="H"
        selected={true}
      />
      <CarComponent
        name="red"
        col={5}
        row={4}
        size={2}
        direction="H"
        selected={true}
      />
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
