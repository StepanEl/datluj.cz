import { useEffect, useState } from "react";
import './Timer.css';

const Timer = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((s) => {
                if (s === 59) {
                    setMinutes((m) => {
                        if (m === 59) {
                            setHours((h) => h + 1);
                            return 0;
                        }
                        return m + 1;
                    });
                    return 0;
                }
                return s + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

  const format = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="timer">
      {format(hours)}:{format(minutes)}:{format(seconds)}
    </div>
  );
};

export default Timer;