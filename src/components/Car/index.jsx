import { useDispatch, useSelector } from 'react-redux';
import TwoHBlack from '../../assets/images/cars/2-black.png';
import TwoHRed from '../../assets/images/cars/2-red.png';
import { TOGGLE_CAR } from '../../constants';
import StyledCar from './StyledCar';

const CarComponent = (props) => {
  const { name } = props;
  let images = { black: TwoHBlack, red: TwoHRed };
  const dispatch = useDispatch();
  const car = useSelector((state) =>
    state.cars.find((car) => car.name === name)
  );
  return (
    <StyledCar
      onClick={() => dispatch({ name, type: TOGGLE_CAR })}
      {...car}
      src={images[name]}
    ></StyledCar>
  );
};

export default CarComponent;
