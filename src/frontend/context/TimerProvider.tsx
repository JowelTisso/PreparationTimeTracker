import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  GET,
  getCurrentDate,
  getFromLocalStorage,
  POST,
} from "../utils/helper";
interface TimerContextType {
  timers: TimerState;
  activeTimer: TimerType;
  setActiveTimer: (type: TimerType) => void;
  setTimers: React.Dispatch<React.SetStateAction<TimerState>>;
  timersSnapshot: TimerState;
  setTimersSnapshot: (timers: TimerState) => void;
}

type TimerState = {
  coding: number;
  interview: number;
  job: number;
};

export const defaultTimer = {
  coding: 6 * 60 * 60,
  interview: 2 * 60 * 60,
  job: 2 * 60 * 60,
};

type TimerType = "coding" | "interview" | "job" | null;

const TimerContext = createContext<TimerContextType | undefined>(undefined);

const currentDate = getCurrentDate();
const getDashboardData = async () => {
  try {
    const res = await GET(`dashboard/${currentDate}`, true);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timers, setTimers] = useState<TimerState>(defaultTimer);
  const [activeTimer, setActiveTimer] = useState<TimerType>(null);
  const [timersSnapshot, setTimersSnapshot] = useState(defaultTimer);
  let interval = useRef<NodeJS.Timeout>();
  let counter = useRef(0);

  const saveTimerDataToDB = async () => {
    const tasks = {
      coding: timers.coding,
      interview: timers.interview,
      job: timers.job,
    };
    const data = {
      activeTimer,
      date: currentDate,
      tasks,
    };
    await POST("dashboard/", data);
    setTimersSnapshot(tasks);
  };

  useEffect(() => {
    (async () => {
      const dashboardData = await getDashboardData();
      if (dashboardData) {
        setTimersSnapshot(JSON.parse(JSON.stringify(dashboardData.tasks)));
        setTimers(dashboardData.tasks);
        setActiveTimer(dashboardData.activeTimer);
      }
    })();
  }, []);

  useEffect(() => {
    counter.current++;
    if (counter.current > 60) {
      counter.current = 0;
      saveTimerDataToDB();
    }
  }, [timers, counter, activeTimer]);

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
      value={{
        timers,
        activeTimer,
        setActiveTimer,
        setTimers,
        timersSnapshot,
        setTimersSnapshot,
      }}
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
