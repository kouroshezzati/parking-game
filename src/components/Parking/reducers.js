import { SELECT_CAR, INITIAL_CELLS, PARKING_HEIGHT, PARKING_WIDTH, ADD_CAR } from "../../constants";

export const carReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_CAR:
      const cars = state.map(car => {
        if (car.name === action.name) {
          car.selected = !car.selected;
        } else {
          car.selected = false;
        }
        return car;
      });
      return cars;
    case ADD_CAR:
      const { car } = action;
      const { col, row, direction, size } = car;
      if (col === null || col === undefined ||
        row === null || row === undefined ||
        !direction || !size) {
        return state;
      }
      if (direction === 'H') {
        if (size + col > PARKING_WIDTH || col < 0 || col > PARKING_WIDTH) {
          return state;
        }
      } else if (direction === 'V') {
        if (size + row > PARKING_HEIGHT || row < 0 || row > PARKING_HEIGHT) {
          return state;
        }
      }
      return [...state, car];
    default: return state
  }
}


export const createCells = () => {
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

const cellsInitialState = createCells();

export const cellReducer = (state = cellsInitialState, action) => {
  switch (action.type) {
    case ADD_CAR:
      const cells = state.slice();
      const { row, col, size, direction } = action.car;
      if (direction === 'H') {
        for (let i = 0; i < size; ++i) {
          cells[row][col + i].occupied = true;
        }
      } else if (direction === 'V') {
        for (let i = 0; i < size; ++i) {
          cells[row + i][col].occupied = true;
        }
      }
    case INITIAL_CELLS: return state;
    default: return state;
  }
}