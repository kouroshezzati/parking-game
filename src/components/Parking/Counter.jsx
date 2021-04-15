import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SAVE_COUNT } from '../../constants';
import { counterToTime } from './reducers';

const CounterComponent = ({}) => {
  const [stop, setStop] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const win = useSelector((state) => state.win);
  if (win) {
    setTimeout(() => {
      dispatch({ type: SAVE_COUNT, count });
      setStop(true);
    }, 0);
  }

  useInterval(() => {
    setCount(count + 1);
  }, stop);

  return <h3>Counter: {counterToTime(count)}</h3>;
};

function useInterval(callback, stop) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, 1000);
    if (stop) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [stop]);
}

export default CounterComponent;
