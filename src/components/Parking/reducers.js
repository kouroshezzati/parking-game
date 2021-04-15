import { TOGGLE_CAR, PARKING_HEIGHT, PARKING_WIDTH, ADD_CAR, MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT } from "../../constants";


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

const reducer = (state = { cars: [], cells: cellsInitialState }, action) => {
  switch (action.type) {
    case TOGGLE_CAR: {
      const cars = state.cars.map(car => {
        if (car.name === action.name) {
          car.selected = !car.selected;
        } else {
          car.selected = false;
        }
        return car;
      });
      return { ...state, cars };
    }
    case ADD_CAR: {
      let cells = cellsDeepCopy(state.cells);
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
      const cars = carsDeepCopy(state.cars);
      cars.push(action.car);
      return { ...state, cars, cells };
    }
    case MOVE_UP: {
      let cells = cellsDeepCopy(state.cells);
      let cars = carsDeepCopy(state.cars);

      const { row, col, size, direction } = action.car;
      if (!row || col === undefined || size === undefined ||
        (direction !== 'H' && direction !== 'V')) {
        return state;
      }

      for (let i = 0; i < size; ++i) {
        if (direction === 'H') {
          if (cells[row - 1][col + i].occupied) {
            return state;
          }
          cells[row][col + i].occupied = false;
          cells[row - 1][col + i].occupied = true;
        } else if (direction === 'V') {
          if (cells[row + i - 1][col].occupied) {
            return state;
          }
          cells[row + i][col].occupied = false;
          cells[row + i - 1][col].occupied = true;
        }
      }

      cars.forEach(car => {
        if (car.selected && car.row > 0) {
          car.row -= 1;
        }
      })
      return { ...state, cars, cells }
    }
    case MOVE_DOWN: {
      let cells = cellsDeepCopy(state.cells);
      let cars = carsDeepCopy(state.cars);

      const { row, col, size, direction } = action.car;
      if (row === undefined || row > 4 || col === undefined || size === undefined ||
        (direction !== 'H' && direction !== 'V')) {
        return state;
      }

      for (let i = 0; i < size; ++i) {
        if (direction === 'H') {
          if (cells[row + 1][col + i].occupied) {
            return state;
          }
          cells[row][col + i].occupied = false;
          cells[row + 1][col + i].occupied = true;
        }
      }

      if (direction === 'V') {
        let tail = row + size - 1;
        for (let i = tail; i >= row; --i) {
          if (cells[i + 1][col].occupied) {
            return state;
          }
          cells[i][col].occupied = false;
          cells[i + 1][col].occupied = true;
        }
      }

      cars.forEach(car => {
        if (car.selected) {
          car.row += 1;
        }
      })
      return { ...state, cars, cells }
    }
    case MOVE_LEFT: {
      let cells = cellsDeepCopy(state.cells);
      let cars = carsDeepCopy(state.cars);

      const { row, col, size, direction } = action.car;
      if (row === undefined || col === undefined || col < 1 || size === undefined ||
        (direction !== 'H' && direction !== 'V')) {
        return state;
      }

      for (let i = col; i < col + size; ++i) {
        if (direction === 'H') {
          if (cells[row][i - 1].occupied) {
            return state;
          }
          cells[row][i].occupied = false;
          cells[row][i - 1].occupied = true;
        }
      }

      if (direction === 'V') {
        for (let i = 0; i < size; ++i) {
          if (cells[row + i][col - 1].occupied) {
            return state;
          }
          cells[row + i][col].occupied = false;
          cells[row + i][col - 1].occupied = true;
        }
      }

      cars.forEach(car => {
        if (car.selected) {
          car.col -= 1;
        }
      })
      return { ...state, cars, cells }
    }
    case MOVE_RIGHT: {
      let cells = cellsDeepCopy(state.cells);
      let cars = carsDeepCopy(state.cars);

      const { row, col, size, direction } = action.car;
      if (row === undefined || col === undefined || col > 4 || size === undefined ||
        (direction !== 'H' && direction !== 'V')) {
        return state;
      }

      for (let tail = col + size - 1; tail >= col; --tail) {
        if (direction === 'H') {
          if (cells[row][tail + 1].occupied) {
            return state;
          }
          cells[row][tail].occupied = false;
          cells[row][tail + 1].occupied = true;
        }
      }

      if (direction === 'V') {
        for (let i = 0; i < size; ++i) {
          if (cells[row + i][col + 1].occupied) {
            return state;
          }
          cells[row + i][col].occupied = false;
          cells[row + i][col + 1].occupied = true;
        }
      }

      cars.forEach(car => {
        if (car.selected) {
          car.col += 1;
        }
      })
      return { ...state, cars, cells }
    }
    default: return state;
  }
}

//deep copy because type of entities are objcet which 
//will be referenced when assigning by shallow copy 
function cellsDeepCopy(cells) {
  return cells.map(row => row.map(col => ({ ...col })));
}

function carsDeepCopy(cars) {
  return cars.map(car => Object.assign({}, car));
}

export default reducer;