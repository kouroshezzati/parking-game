import { SELECT_CAR } from '../../constants';
import reducer from './reducer';

describe('Testing reducer', () => {
  it('should udpate the selected property', () => {
    const result = reducer({
      cars: [
        { name: 'red', selected: false },
        { name: 'black', selected: true }]
    }, { name: 'red', type: SELECT_CAR });
    expect(result.cars).toEqual([
      { name: 'red', selected: true },
      { name: 'black', selected: false }
    ])
  })
})