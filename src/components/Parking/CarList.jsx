import React from 'react';
import { useSelector } from 'react-redux';

import CarComponent from '../Car';

const CarListComponent = () => {
  
  const cars = useSelector((state) => state.cars);
  return (
    <React.Fragment>
      {cars && cars.map((car, index) => <CarComponent key={index} {...car} />)}
    </React.Fragment>
  );
};

export default CarListComponent;
