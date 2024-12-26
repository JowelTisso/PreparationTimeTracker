import { UndoOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Progress } from "antd";
import { useEffect, useRef, useState } from "react";
import { COLORS } from "../../utils/Colors";
import {
  ButtonWrapper,
  Header,
  LogoutBtnWrapper,
  ResetBtnWrapper,
  TimerWrapper,
  ToggleButton,
  Wrapper,
} from "./DashboardStyles";
import { useNavigate } from "react-router-dom";

type TimerType = "coding" | "interview" | "job" | null;
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

const Dashboard = () => {
  const [activeTimer, setActiveTimer] = useState<TimerType>(null);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [timers, setTimers] = useState<TimerState>(() => {
    const savedTimers = localStorage.getItem("timers");
    return savedTimers ? JSON.parse(savedTimers) : defaultTimer;
  });

  const handleClick = (type: TimerType) => {
    setActiveTimer((prev) => (prev === type ? null : type));
    localStorage.setItem(
      "activeTimer",
      JSON.stringify(type === activeTimer ? null : type)
    );
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return (
      <>
        <span className="time-value">{hours.toString()}</span>
        <span className="time-label"> hr </span>
        <span className="time-value">
          {minutes.toString().padStart(2, "0")}
        </span>
        <span className="time-label"> min </span>
        <span className="time-value">
          {seconds.toString().padStart(2, "0")}
        </span>
        <span className="time-label"> sec</span>
      </>
    );
  };

  let interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

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

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     console.log("unload");

  //     localStorage.setItem("activeTimer", JSON.stringify(null));
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  // }, []);

  const calculatePercent = (timer: number, totalMin: number = 120) => {
    const completedMin = totalMin - Math.ceil(timer / 60);
    const codingPercent = (completedMin / totalMin) * 100;
    return Math.round(codingPercent);
  };

  const onReset = () => {
    setTimers(defaultTimer);
  };

  return (
    <Wrapper>
      {contextHolder}
      <LogoutBtnWrapper>
        <Button
          shape="circle"
          icon={<UploadOutlined style={{ color: COLORS.Active }} />}
          size="large"
          onClick={() => {
            localStorage.clear();
            navigate("/auth");
          }}
        />
      </LogoutBtnWrapper>
      <ResetBtnWrapper>
        <Button
          shape="circle"
          icon={<UndoOutlined style={{ color: COLORS.Active }} />}
          size="large"
          onClick={onReset}
        />
      </ResetBtnWrapper>
      <Header>
        <p>Dedicated Time</p>
        <p className="dedicated-time">10 hours</p>
      </Header>
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
      {/* <Header>
        <p>Dedicated Time</p>
        <p className="dedicated-time">10 hours</p>
      </Header> */}
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
