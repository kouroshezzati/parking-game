import { ADD_CAR, INITIAL_CELLS, SELECT_CAR } from '../../constants';
import { carReducer, cellReducer, createCells } from './reducers';

describe('Testing the car reducer', () => {
  it('should udpate the selected property', () => {
    const result = carReducer([
      { name: 'red', selected: false },
      { name: 'black', selected: true }
    ],
      { name: 'red', type: SELECT_CAR });
    expect(result).toEqual([
      { name: 'red', selected: true },
      { name: 'black', selected: false }
    ])
  });

  it('should add a car to car list', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const result = carReducer([], { type: ADD_CAR, car });
    expect(result).toEqual([car]);
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

  })
})