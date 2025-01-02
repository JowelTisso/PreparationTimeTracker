import {
  ExclamationCircleFilled,
  UndoOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Modal, Progress } from "antd";
import { debounce, isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { defaultTimer, useTimer } from "../../context/TimerProvider";
import { COLORS } from "../../utils/Colors";
import { clearLocalStorage, getCurrentDate, POST } from "../../utils/helper";
import {
  ButtonWrapper,
  LogoutBtnWrapper,
  ResetBtnWrapper,
  TimerWrapper,
  ToggleButton,
  Wrapper,
} from "./DashboardStyles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { initialLogState, updateLogs } from "../../reducer/logSlice";

type TimerType = "coding" | "interview" | "job" | null;

const currentDate = getCurrentDate();

export const calculatePercent = (timer: number, totalMin: number = 120) => {
  const completedMin = totalMin - Math.ceil(timer / 60);
  const codingPercent = (completedMin / totalMin) * 100;
  return Math.round(codingPercent);
};

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <>
      <span className="time-value">{hours.toString()}</span>
      <span className="time-label"> hr </span>
      <span className="time-value">{minutes.toString().padStart(2, "0")}</span>
      <span className="time-label"> min </span>
      <span className="time-value">{seconds.toString().padStart(2, "0")}</span>
      <span className="time-label"> sec</span>
    </>
  );
};
const { confirm } = Modal;

const Dashboard = () => {
  const [loading, setLoading] = useState({
    spin: false,
    tick: false,
  });
  const navigate = useNavigate();
  const {
    timers,
    activeTimer,
    setActiveTimer,
    setTimers,
    timersSnapshot,
    setTimersSnapshot,
  } = useTimer();
  const timersRef = useRef(timers);
  const timersSnapshotRef = useRef(timersSnapshot);
  const debouncedSaveTimerDataToDBRef = useRef<any>();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (type: TimerType) => {
    const isSameTimer = activeTimer === type;
    setActiveTimer(isSameTimer ? null : type);
    debouncedSaveTimerDataToDBRef.current(isSameTimer ? null : type);
  };

  const isDataChanged = () =>
    !isEqual(timersRef.current, timersSnapshotRef.current);

  const saveTimerDataToDB = async (currentTimer: TimerType) => {
    const latestTimers = timersRef.current;
    const tasks = {
      coding: latestTimers.coding,
      interview: latestTimers.interview,
      job: latestTimers.job,
    };

    if (isDataChanged()) {
      setLoading((prev) => ({ ...prev, spin: true }));
      const data = {
        activeTimer: currentTimer,
        date: currentDate,
        tasks,
      };
      const res = await POST("dashboard/", data);
      if (res) {
        setLoading({
          spin: false,
          tick: true,
        });
        setTimersSnapshot(tasks);
      }
      setTimeout(() => {
        setLoading({
          spin: false,
          tick: false,
        });
      }, 2000);
      return res;
    }
  };

  const resetTimer = () => {
    confirm({
      title: "Do you want to reset the timer?",
      icon: <ExclamationCircleFilled />,
      content: "All the progress of this day will be lost!",
      okText: "Reset",
      okType: "danger",
      cancelText: "Cancel",
      maskClosable: true,
      onOk() {
        setTimers(defaultTimer);
      },
    });
  };

  const logoutHandler = debounce(async () => {
    await saveTimerDataToDB(null);
    dispatch(updateLogs(initialLogState));
    setActiveTimer(null);
    clearLocalStorage();
    navigate("/auth");
  }, 500);

  const actionOnVisibilityChange = debounce(() => {
    if (document.visibilityState === "hidden") {
      saveTimerDataToDB(activeTimer);
    }
  }, 1000);

  useEffect(() => {
    debouncedSaveTimerDataToDBRef.current = debounce(saveTimerDataToDB, 2000);
  }, []);

  useEffect(() => {
    timersRef.current = timers;
    timersSnapshotRef.current = timersSnapshot;
    document.addEventListener("visibilitychange", actionOnVisibilityChange);
    return () => {
      document.removeEventListener(
        "visibilitychange",
        actionOnVisibilityChange
      );
    };
  }, [timers, timersSnapshot]);

  return (
    <Wrapper>
      <LogoutBtnWrapper>
        <Button
          shape="circle"
          icon={<UploadOutlined style={{ color: COLORS.Active }} />}
          size="large"
          onClick={logoutHandler}
        />
      </LogoutBtnWrapper>
      <ResetBtnWrapper>
        <Button
          shape="circle"
          icon={<UndoOutlined style={{ color: COLORS.Active }} />}
          size="large"
          onClick={resetTimer}
        />
      </ResetBtnWrapper>
      <Header title="Dedicated Time" loading={loading} isDashboard={true} />
      <TimerWrapper>
        <div className="wrapper">
          <span className="title">Coding</span>
          <span className="timer">{formatTime(timers.coding)}</span>
        </div>
        <Progress
          percent={calculatePercent(timers.coding, 360)}
          strokeColor={COLORS.Active}
          size={"small"}
        />
        <div className="wrapper">
          <span className="title">Interview</span>
          <span className="timer">{formatTime(timers.interview)}</span>
        </div>
        <Progress
          percent={calculatePercent(timers.interview)}
          strokeColor={COLORS.Active}
          size={"small"}
        />
        <div className="wrapper">
          <span className="title">Job</span>
          <span className="timer">{formatTime(timers.job)}</span>
        </div>
        <Progress
          percent={calculatePercent(timers.job)}
          strokeColor={COLORS.Active}
          size={"small"}
        />
      </TimerWrapper>

      <ButtonWrapper>
        <div>
          <ToggleButton
            isChecked={activeTimer === "coding"}
            onClick={() => handleClick("coding")}
          >
            Coding
          </ToggleButton>
          <p>Project</p>
        </div>
        <div>
          <ToggleButton
            isChecked={activeTimer === "interview"}
            onClick={() => handleClick("interview")}
          >
            Interview
          </ToggleButton>
          <p>Preparation</p>
        </div>
        <div>
          <ToggleButton
            isChecked={activeTimer === "job"}
            onClick={() => handleClick("job")}
          >
            Job
          </ToggleButton>
          <p>Application</p>
        </div>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Dashboard;
