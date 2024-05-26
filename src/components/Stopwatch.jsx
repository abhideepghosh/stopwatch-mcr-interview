import React, { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  const start = () => {
    startTimeRef.current = Date.now() - elapsedTime;
    setIsRunning(true);
  };
  const stop = () => {
    setIsRunning(false);
  };
  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    // let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    // hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  return (
    <div>
      <h1 className="text-center text-xl p-2">Stopwatch</h1>

      <main>
        <h1 className="font-bold text-4xl text-center">{formatTime()}</h1>
        <div className="flex gap-2 justify-center text-center">
          <button className="text-xl border-2 rounded-lg p-2" onClick={start}>
            Start
          </button>
          <button className="text-xl border-2 rounded-lg p-2" onClick={stop}>
            Stop
          </button>
          <button className="text-xl border-2 rounded-lg p-2" onClick={reset}>
            Reset
          </button>
        </div>
      </main>
    </div>
  );
};
export default Stopwatch;
