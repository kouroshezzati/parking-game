import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MOVE_UP } from '../../constants';

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
    if (dir === 'up') {
      dispatch({ type: MOVE_UP, car });
    }
  });

  return (
    <React.Fragment>
      {cars && cars.map((car, index) => <CarComponent key={index} {...car} />)}
    </React.Fragment>
  );
};

export default CarListComponent;
