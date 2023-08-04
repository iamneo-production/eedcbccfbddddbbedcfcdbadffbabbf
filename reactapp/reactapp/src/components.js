import React, { useState, useRef } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);
  const name = 'React Stopwatch';
  const formatTime = (timeInSeconds) => {
    const padTime = (time, digits) => {
      return `${new Array(digits - time.toString().length)
        .fill(0)
        .join("")}${time}`;
    };
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${padTime(hours, 2)}:${padTime(minutes, 2)}:${padTime(seconds, 2)}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
    setIsActive(false);
  };

  const handleResume = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  return (
    <div className="container justify-content-center m-2 p-1">
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <p className="display-4">{name}</p>
              <p data-testid="time" className="display-4">
                <strong>{formatTime(time)}</strong>
              </p>
              {!isActive && !isPaused && (
                <button
                  data-testid="start"
                  onClick={handleStart}
                  className="btn btn-primary p-2 m-1"
                >
                  Start
                </button>
              )}
              {(isActive || isPaused) && (
                <button
                  data-testid="pause"
                  onClick={handlePause}
                  className="btn btn-primary p-2 m-1"
                >
                  Pause
                </button>
              )}
              {isPaused && (
                <button
                  data-testid="resume"
                  onClick={handleResume}
                  className="btn btn-primary p-2 m-1"
                >
                  Resume
                </button>
              )}
              <button
                data-testid="reset"
                onClick={handleReset}
                disabled={!isActive && !isPaused}
                className="btn btn-primary p-2 m-1"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;

