import { INITIAL_CELLS, SELECT_CAR } from '../../constants';
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
  })
});

describe('Testing the cells reducer', () => {
  it('should return all cells', () => {
    const result = cellReducer(undefined, { type: INITIAL_CELLS });
    const cells = createCells();
    expect(result).toEqual(cells)
  })
})