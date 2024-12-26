import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

interface TimerContextType {
  timers: TimerState;
  activeTimer: TimerType;
  setActiveTimer: (type: TimerType) => void;
  setTimers: React.Dispatch<React.SetStateAction<TimerState>>;
}

type TimerState = {
  coding: number;
  interview: number;
  job: number;
};

const defaultTimer = {
  coding: 6 * 60 * 60,
  interview: 2 * 60 * 60,
  job: 2 * 60 * 60,
};

type TimerType = "coding" | "interview" | "job" | null;

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timers, setTimers] = useState<TimerState>(() => {
    const savedTimers = localStorage.getItem("timers");
    return savedTimers ? JSON.parse(savedTimers) : defaultTimer;
  });
  const [activeTimer, setActiveTimer] = useState<TimerType>(null);
  let interval = useRef<NodeJS.Timeout>();

  //   console.log({ timers, activeTimer });

  //   useEffect(() => {
  //     localStorage.setItem("timers", JSON.stringify(timers));
  //   }, [timers]);

  useEffect(() => {
    if (activeTimer) {
      interval.current = setInterval(() => {
        setTimers((prevTimers) => {
          const updatedTime = prevTimers[activeTimer] - 1;
          return {
            ...prevTimers,
            [activeTimer]: updatedTime >= 0 ? updatedTime : 0,
          };
        });
      }, 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [activeTimer]);

  return (
    <TimerContext.Provider
      value={{ timers, activeTimer, setActiveTimer, setTimers }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
