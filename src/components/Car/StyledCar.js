import styled from 'styled-components';

const StyledCar = styled.img`
  position: absolute;
  ${props => {
    const { size, direction, col, row, selected } = props;
    return {
      border: selected ? '3px solid blue' : 'unset',
      top: col * 102,
      left: row * 102,
      width: direction === 'H' ? 100 * size : 100,
      height: direction === 'V' ? 100 * size : 100,
    };
  }}
`;

export default StyledCar;
