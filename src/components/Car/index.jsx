import { useDispatch, useSelector } from 'react-redux';
import TwoHBlack from '../../assets/images/cars/2-black.png';
import TwoHGreen from '../../assets/images/cars/2-green.png';
import TwoHGray from '../../assets/images/cars/2-gray.png';
import TwoHPink from '../../assets/images/cars/2-pink.png';
import TwoHLightGreen from '../../assets/images/cars/2-light-green.png';
import ThreeHBlue from '../../assets/images/cars/3-blue.png';
import TwoHRed from '../../assets/images/cars/2-red.png';
import TwoVBrown from '../../assets/images/cars/2-v-brown.png';
import TwoVOrange from '../../assets/images/cars/2-v-orange.png';
import TwoVPurple from '../../assets/images/cars/2-v-purple.png';
import TwoVTurquoise from '../../assets/images/cars/2-v-turquoise.png';
import ThreeVYellow from '../../assets/images/cars/3-v-yellow.png';
import { TOGGLE_CAR } from '../../constants';
import StyledCar from './StyledCar';

const CarComponent = (props) => {
  const { name } = props;
  let images = {
    black: TwoHBlack,
    red: TwoHRed,
    green: TwoHGreen,
    gray: TwoHGray,
    pink: TwoHPink,
    lightGreen: TwoHLightGreen,
    blue: ThreeHBlue,
    red: TwoHRed,
    brown: TwoVBrown,
    orange: TwoVOrange,
    purple: TwoVPurple,
    turquoise: TwoVTurquoise,
    yellow: ThreeVYellow,
  };
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
