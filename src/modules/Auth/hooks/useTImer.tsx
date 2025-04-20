import { useState, useEffect } from "react";

const THREE_MINUTES = 3 * 60;
const WARNING_THRESHOLD = 30;

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedEndTime = localStorage.getItem("timerEndTime");

    if (!savedEndTime) {
      const endTime = Date.now() + THREE_MINUTES * 1000;
      localStorage.setItem("timerEndTime", endTime.toString());
      return THREE_MINUTES;
    }

    const remainingTime = Math.round(
      (parseInt(savedEndTime) - Date.now()) / 1000
    );
    if (remainingTime <= 0) {
      localStorage.removeItem("timerEndTime");
      const newEndTime = Date.now() + THREE_MINUTES * 1000;
      localStorage.setItem("timerEndTime", newEndTime.toString());
      return THREE_MINUTES;
    }

    return remainingTime;
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          localStorage.removeItem("timerEndTime");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    time: {
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    },
    isWarning: timeLeft <= WARNING_THRESHOLD,
    timeLeft,
  };
};
