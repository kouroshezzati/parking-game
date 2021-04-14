import { ADD_CAR, INITIAL_CELLS, MOVE_UP, TOGGLE_CAR } from '../../constants';
import { carReducer, cellReducer, createCells } from './reducers';

describe('Testing the car reducer', () => {
  it('should udpate the selected property', () => {
    const result = carReducer([
      { name: 'red', selected: false },
      { name: 'black', selected: true }
    ],
      { name: 'red', type: TOGGLE_CAR });
    expect(result).toEqual([
      { name: 'red', selected: true },
      { name: 'black', selected: false }
    ])
  });

  it('should add a car to car list', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const result = carReducer([], { type: ADD_CAR, car });
    expect(result).toEqual([car]);
  });

  it('should move up the car row', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const addedCarresult = carReducer([], { type: ADD_CAR, car });
    const selectedCarResult = carReducer(addedCarresult, { type: TOGGLE_CAR, name: car.name })
    const moveCarResult = carReducer(selectedCarResult, { type: MOVE_UP, car });
    expect(moveCarResult[0].row).toBe(0);
  })
});

describe('Testing the cells reducer', () => {

  it('should return all cells', () => {
    const result = cellReducer(undefined, { type: INITIAL_CELLS });
    const cells = createCells();
    expect(result).toEqual(cells)
  });

  it('should occupied cells under the car', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const cells = createCells();
    const result = cellReducer(undefined, { type: ADD_CAR, car });
    cells[1][0].occupied = true;
    cells[1][1].occupied = true;
    expect(cells).toEqual(result);
  });

  it('should occupied cells in upper row and release current row', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const cellAddCarResult = cellReducer(undefined, { type: ADD_CAR, car });
    const movedUpResult = cellReducer(cellAddCarResult, { type: MOVE_UP, car });
    expect(movedUpResult[0][0].occupied).toBeTruthy();
    expect(movedUpResult[0][1].occupied).toBeTruthy();
  });

  it('should move up for vertical direction car', () => {
    const car = { name: 'red', size: 2, direction: 'V', col: 0, row: 1 };//[1,0],[2,0]
    const cellAddCarResult = cellReducer(undefined, { type: ADD_CAR, car });
    const movedUpResult = cellReducer(cellAddCarResult, { type: MOVE_UP, car });//[0,0],[1,0]
    expect(movedUpResult[0][0].occupied).toBeTruthy();
    expect(movedUpResult[1][0].occupied).toBeTruthy();
  });

  it('should not move the car because there is one upon it', () => {
    const redCar = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const blackCar = { name: 'black', size: 2, direction: 'H', col: 0, row: 0 };
    const addedRedCarResult = cellReducer(undefined, { type: ADD_CAR, car: redCar });
    const addedBlackCarResult = cellReducer(addedRedCarResult, { type: ADD_CAR, car: blackCar });
    const movedUpResult = cellReducer(addedBlackCarResult, { type: MOVE_UP, car: redCar });

    expect(movedUpResult).toEqual(addedBlackCarResult);
    expect(movedUpResult[1][0].occupied).toBeTruthy();
    expect(movedUpResult[1][1].occupied).toBeTruthy();
  });
})