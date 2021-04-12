import { SELECT_CAR } from "../../constants";

const initialState = {
  cars: [
    { name: 'black', size: 2, direction: 'H', col: 4, row: 5 },
    { name: 'red', size: 2, direction: 'H', col: 0, row: 1 }
  ]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CAR:
      const cars = state.cars.map(car => {
        if (car.name === action.name) {
          car.selected = !car.selected;
        } else {
          car.selected = false;
        }
        return car;
      });
      return { ...state, cars };
    default: return state
  }
}

export default reducer;