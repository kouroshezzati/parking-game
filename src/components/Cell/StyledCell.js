import styled from 'styled-components';

export const StyledCell = styled.div`
  height: 100px;
  width: 100px;
  display: inline-block;
  border: 1px solid;
  ${props => {
    const { occupied, row, col } = props;
    return {
      backgroundColor: occupied ? 'gray' : 'transparent',
      border: (row === 2 || row == 3) && col === 5 ? 'unset' : '1px solid',
    }
  }}
`