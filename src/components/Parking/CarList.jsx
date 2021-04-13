import React from 'react';
import { useSelector } from 'react-redux';

import CarComponent from '../Car';
import useKeyPress from './useKeyPress';

const CarListComponent = () => {
  const cars = useSelector((state) => {
    return state.cars;
  });

  useKeyPress((e) => {
    const dir = e.key.replace('Arrow', '').toLowerCase();
    console.log(dir);
  });

  return (
    <React.Fragment>
      {cars && cars.map((car, index) => <CarComponent key={index} {...car} />)}
    </React.Fragment>
  );
};

export default CarListComponent;
