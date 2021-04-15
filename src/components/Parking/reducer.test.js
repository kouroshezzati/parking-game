import { ADD_CAR, INITIAL_CELLS, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, TOGGLE_CAR } from '../../constants';
import reducer, { createCells } from './reducers';

describe('Testing the reducer', () => {

  it('should return all cells', () => {
    const result = reducer(undefined, { type: INITIAL_CELLS });
    const cells = createCells();
    expect(result.cells).toEqual(cells)
  });

  it('should udpate the selected property', () => {
    const result = reducer({
      cars: [
        { name: 'red', selected: false },
        { name: 'black', selected: true }
      ]
    }, { name: 'red', type: TOGGLE_CAR });
    expect(result.cars).toEqual([
      { name: 'red', selected: true },
      { name: 'black', selected: false }
    ])
  });

  it('should add a car to car list', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const result = reducer(undefined, { type: ADD_CAR, car });
    expect(result.cars).toEqual([car]);
  });

  it('should occupied cells under the car', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const cells = createCells();
    const result = reducer(undefined, { type: ADD_CAR, car });
    cells[1][0].occupied = true;
    cells[1][1].occupied = true;
    expect(cells).toEqual(result.cells);
  });

  it('should move up the car row', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const addedCarresult = reducer(undefined, { type: ADD_CAR, car });
    const selectedCarResult = reducer(addedCarresult, { type: TOGGLE_CAR, name: car.name })
    const moveCarResult = reducer(selectedCarResult, { type: MOVE_UP, car });
    expect(moveCarResult.cars[0].row).toBe(0);
  });

  it('should occupied cells in upper row and release current row', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const cellAddCarResult = reducer(undefined, { type: ADD_CAR, car });
    const movedUpResult = reducer(cellAddCarResult, { type: MOVE_UP, car });
    expect(movedUpResult.cells[0][0].occupied).toBeTruthy();
    expect(movedUpResult.cells[0][1].occupied).toBeTruthy();
  });

  it('should move up for vertical direction car', () => {
    const car = { name: 'red', size: 2, direction: 'V', col: 0, row: 1 };//[1,0],[2,0]
    const cellAddCarResult = reducer(undefined, { type: ADD_CAR, car });
    const movedUpResult = reducer(cellAddCarResult, { type: MOVE_UP, car });//[0,0],[1,0]
    expect(movedUpResult.cells[0][0].occupied).toBeTruthy();
    expect(movedUpResult.cells[1][0].occupied).toBeTruthy();
  });

  it('should not move the car because there is one upon it', () => {
    const redCar = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const blackCar = { name: 'black', size: 2, direction: 'H', col: 0, row: 0 };
    const addedRedCarResult = reducer(undefined, { type: ADD_CAR, car: redCar });
    const addedBlackCarResult = reducer(addedRedCarResult, { type: ADD_CAR, car: blackCar });
    const movedUpResult = reducer(addedBlackCarResult, { type: MOVE_UP, car: redCar });

    expect(movedUpResult).toEqual(addedBlackCarResult);
    expect(movedUpResult.cells[1][0].occupied).toBeTruthy();
    expect(movedUpResult.cells[1][1].occupied).toBeTruthy();
  });


  it('should move down the car row', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const addedCarresult = reducer(undefined, { type: ADD_CAR, car });
    const selectedCarResult = reducer(addedCarresult, { type: TOGGLE_CAR, name: car.name })
    const moveCarResult = reducer(selectedCarResult, { type: MOVE_DOWN, car });
    expect(moveCarResult.cars[0].row).toBe(2);
  });
  
  it('should occupied cells in below row and release current row', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const cellAddCarResult = reducer(undefined, { type: ADD_CAR, car });
    const movedDownResult = reducer(cellAddCarResult, { type: MOVE_DOWN, car });
    expect(movedDownResult.cells[2][0].occupied).toBeTruthy();
    expect(movedDownResult.cells[2][1].occupied).toBeTruthy();
  });
  

  it('should move down for vertical direction car', () => {
    const car = { name: 'red', size: 2, direction: 'V', col: 0, row: 2 };//[2,0],[3,0]
    const cellAddCarResult = reducer(undefined, { type: ADD_CAR, car });
    const movedDownResult = reducer(cellAddCarResult, { type: MOVE_DOWN, car });//[3,0],[4,0]
    expect(movedDownResult.cells[3][0].occupied).toBeTruthy();
    expect(movedDownResult.cells[4][0].occupied).toBeTruthy();
  });

  it('should not move the car because there is one under it', () => {
    const blackCar = { name: 'black', size: 2, direction: 'H', col: 0, row: 0 };
    const redCar = { name: 'red', size: 2, direction: 'H', col: 0, row: 1 };
    const addedRedCarResult = reducer(undefined, { type: ADD_CAR, car: redCar });
    const addedBlackCarResult = reducer(addedRedCarResult, { type: ADD_CAR, car: blackCar });
    const movedUpResult = reducer(addedBlackCarResult, { type: MOVE_DOWN, car: blackCar });

    expect(movedUpResult).toEqual(addedBlackCarResult);
    expect(movedUpResult.cells[0][0].occupied).toBeTruthy();
    expect(movedUpResult.cells[0][1].occupied).toBeTruthy();
  });

  
  it('should move the car to the left', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 1, row: 1 };
    const addedCarresult = reducer(undefined, { type: ADD_CAR, car });//[1,1], [1,2]
    const selectedCarResult = reducer(addedCarresult, { type: TOGGLE_CAR, name: car.name })
    const moveCarResult = reducer(selectedCarResult, { type: MOVE_LEFT, car });//[0,1], [1,1]
    expect(moveCarResult.cells[1][0].occupied).toBeTruthy();
    expect(moveCarResult.cells[1][1].occupied).toBeTruthy();
    expect(moveCarResult.cars[0].col).toBe(0);
  });
  
  it('should move the verticatl car to the left', () => {
    const car = { name: 'red', size: 2, direction: 'V', col: 1, row: 1 };
    const addedCarresult = reducer(undefined, { type: ADD_CAR, car });//[1,1], [2,1]
    const selectedCarResult = reducer(addedCarresult, { type: TOGGLE_CAR, name: car.name })
    const moveCarResult = reducer(selectedCarResult, { type: MOVE_LEFT, car });//[1,0], [2,0]
    expect(moveCarResult.cells[1][0].occupied).toBeTruthy();
    expect(moveCarResult.cells[2][0].occupied).toBeTruthy();
    expect(moveCarResult.cars[0].col).toBe(0);
  });

    
  it('should move the car to the right', () => {
    const car = { name: 'red', size: 2, direction: 'H', col: 1, row: 1 };
    const addedCarresult = reducer(undefined, { type: ADD_CAR, car });//[1,1], [1,2]
    const selectedCarResult = reducer(addedCarresult, { type: TOGGLE_CAR, name: car.name })
    const moveCarResult = reducer(selectedCarResult, { type: MOVE_RIGHT, car });//[1,2], [1,3]
    expect(moveCarResult.cells[1][2].occupied).toBeTruthy();
    expect(moveCarResult.cells[1][3].occupied).toBeTruthy();
    expect(moveCarResult.cars[0].col).toBe(2);
  });
    
  it('should move the verticatl car to the right', () => {
    const car = { name: 'red', size: 2, direction: 'V', col: 1, row: 1 };
    const addedCarresult = reducer(undefined, { type: ADD_CAR, car });//[1,1], [2,1]
    const selectedCarResult = reducer(addedCarresult, { type: TOGGLE_CAR, name: car.name })
    const moveCarResult = reducer(selectedCarResult, { type: MOVE_RIGHT, car });//[1,2], [2,2]
    expect(moveCarResult.cells[1][2].occupied).toBeTruthy();
    expect(moveCarResult.cells[2][2].occupied).toBeTruthy();
    expect(moveCarResult.cars[0].col).toBe(2);
  });
})