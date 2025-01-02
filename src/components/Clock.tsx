import { useEffect, useState } from "react";
import { DaysOfWeek } from "../DaysOfWeek";
import { Month } from "../Months";

function Clock() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);
  const secondsNumber = date.getSeconds();
  const minutesNumber = date.getMinutes();
  const hoursNumber = date.getHours();
  const secondsString = secondsNumber < 10 ? `0${secondsNumber}` : secondsNumber;
  const minutesString = minutesNumber < 10 ? `0${minutesNumber}` : minutesNumber;
  const hoursString = hoursNumber < 10 ? `0${hoursNumber}` : hoursNumber;
  return (
    <p className="text-start">
        <h2>{`${hoursString}:${minutesString}:${secondsString}`}</h2>
        <h4>{`${DaysOfWeek[date.getDay()]}, ${date.getDate()} ${Month[date.getMonth()]} `}</h4>
    </p>
  );
}

export default Clock;
