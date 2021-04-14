import { TOGGLE_CAR, INITIAL_CELLS, PARKING_HEIGHT, PARKING_WIDTH, ADD_CAR, MOVE_UP } from "../../constants";

export const carReducer = (state = [], action) => {
  switch (action.type) {
    case TOGGLE_CAR:
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
      let cells = cellsDeepCopy(state);
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
      return cells;
    case INITIAL_CELLS: return state;
    case MOVE_UP: {
      let cells = cellsDeepCopy(state);
      const { row, col, size, direction } = action.car;
      if (row === undefined || col === undefined || size === undefined || (direction !== 'H' && direction !== 'V')) {
        return state;
      }
      if (direction === 'H') {
        if (row === 0) {
          return state;
        }
        for (let i = 0; i < size; ++i) {
          if (cells[row - 1][col + i].occupied) {
            return state;
          }
          cells[row][col + i].occupied = false;
          cells[row - 1][col + i].occupied = true;
        }
      }
      return cells;
    }
    default: return state;
  }
}

//deep copy because type of entities are objcet which 
//will be referenced when assigning by shallow copy 
function cellsDeepCopy(cells) {
  return cells.map(row => row.map(col => ({ ...col })));
}

function getSelectedCar(cars) {
  cars.find(car => {
    if (car.selected) {
      return car;
    }
  })
}