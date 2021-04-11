import TwoHBlack from '../../assets/images/cars/2-black.png';
import StyledCar from './StyledCar';

const CarComponent = (props) => {
  return <StyledCar {...props} src={TwoHBlack}></StyledCar>;
};

export default CarComponent;
