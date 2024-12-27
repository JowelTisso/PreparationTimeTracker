import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { GET, getFromLocalStorage, POST } from "../utils/helper";
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

export const defaultTimer = {
  coding: 6 * 60 * 60,
  interview: 2 * 60 * 60,
  job: 2 * 60 * 60,
};

type TimerType = "coding" | "interview" | "job" | null;

const TimerContext = createContext<TimerContextType | undefined>(undefined);
const currentDate = new Date().setHours(0, 0, 0, 0);
const getDashboardData = async () => {
  const token = getFromLocalStorage("token");
  const res = await GET(`dashboard/${currentDate}`, token);
  return res;
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timers, setTimers] = useState<TimerState>(defaultTimer);
  const [activeTimer, setActiveTimer] = useState<TimerType>(null);
  let interval = useRef<NodeJS.Timeout>();
  let counter = useRef(0);

  const saveTimerDataToDB = async () => {
    const data = {
      activeTimer,
      date: currentDate,
      tasks: {
        coding: timers.coding,
        interview: timers.interview,
        job: timers.job,
      },
    };
    const res = await POST("dashboard/", data);
    // if (res) {
    //   messageApi.success("Timer data saved successfully");
    // }
  };

  useEffect(() => {
    (async () => {
      const dashboardData = await getDashboardData();
      if (dashboardData) {
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
