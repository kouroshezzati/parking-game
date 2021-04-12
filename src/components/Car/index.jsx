import TwoHBlack from '../../assets/images/cars/2-black.png';
import TwoHRed from '../../assets/images/cars/2-red.png';
import StyledCar from './StyledCar';

const CarComponent = (props) => {
  let images = { black: TwoHBlack, red: TwoHRed };
  return <StyledCar {...props} src={images[props.name]}></StyledCar>;
};

export default CarComponent;
