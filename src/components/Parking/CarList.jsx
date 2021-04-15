import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from '../../constants';

import CarComponent from '../Car';
import useKeyPress from './useKeyPress';

const CarListComponent = () => {
  const cars = useSelector((state) => {
    return state.cars;
  });
  const dispatch = useDispatch();
  useKeyPress((e) => {
    const dir = e.key.replace('Arrow', '').toLowerCase();
    const car = cars.find((car) => car.selected === true);
    switch (dir) {
      case 'up':
        dispatch({ type: MOVE_UP, car });
        break;
      case 'down':
        dispatch({ type: MOVE_DOWN, car });
        break;
      case 'left':
        dispatch({ type: MOVE_LEFT, car });
        break;
      case 'right':
        dispatch({ type: MOVE_RIGHT, car });
        break;

      default:
        break;
    }
  });

  return (
    <React.Fragment>
      {cars && cars.map((car, index) => <CarComponent key={index} {...car} />)}
    </React.Fragment>
  );
};

export default CarListComponent;
