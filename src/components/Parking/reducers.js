import { SELECT_CAR, INITIAL_CELLS, PARKING_HEIGHT, PARKING_WIDTH } from "../../constants";

const carInitialState = [
  { name: 'black', size: 2, direction: 'H', col: 4, row: 5 },
  { name: 'red', size: 2, direction: 'H', col: 0, row: 1 }
]

export const carReducer = (state = carInitialState, action) => {
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
    case INITIAL_CELLS: return state;
    default: return state;
  }
}