import { useEffect} from "react";
import './Timer.css';

interface TimerProps {
  onTick: (seconds: number) => void;
}

const Timer = ({ onTick }: TimerProps) => {
  useEffect(() => {
    let seconds = 0;

    const interval = setInterval(() => {
      seconds+=1;
      onTick(seconds); 
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default Timer;