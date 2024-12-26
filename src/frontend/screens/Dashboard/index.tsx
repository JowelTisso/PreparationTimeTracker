import { UndoOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Progress } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../../context/TimerProvider";
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

type TimerType = "coding" | "interview" | "job" | null;

const defaultTimer = {
  coding: 6 * 60 * 60,
  interview: 2 * 60 * 60,
  job: 2 * 60 * 60,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { timers, activeTimer, setActiveTimer, setTimers } = useTimer();

  const handleClick = (type: TimerType) => {
    if (activeTimer === type) {
      setActiveTimer(null);
    } else {
      setActiveTimer(type);
    }
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

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("activeTimer", JSON.stringify(null));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

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
