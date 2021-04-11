import react from 'react';
import TwoHBlack from '../../assets/images/cars/2-black.png';
import './style.css';

const CarComponent = ({ name, size, direction }) => {
  let styles = {
    width: direction === 'H' ? 100 * size : 100,
    height: direction === 'V' ? 100 * size : 100,
  };
  return <img className='car' src={TwoHBlack} style={styles} />;
};

export default CarComponent;
