import {
  ExclamationCircleFilled,
  UndoOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Progress, Modal } from "antd";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMessageApi } from "../../context/MessageProvider";
import { defaultTimer, useTimer } from "../../context/TimerProvider";
import { COLORS } from "../../utils/Colors";
import { POST } from "../../utils/helper";
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

const currentDate = new Date().setHours(0, 0, 0, 0);

const calculatePercent = (timer: number, totalMin: number = 120) => {
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
  const navigate = useNavigate();
  const { timers, activeTimer, setActiveTimer, setTimers } = useTimer();
  const latestTimersRef = useRef(timers);
  const messageApi = useMessageApi();

  const handleClick = (type: TimerType) => {
    if (activeTimer === type) {
      setActiveTimer(null);
    } else {
      setActiveTimer(type);
    }
  };

  const saveTimerDataToDB = useCallback(async () => {
    const data = {
      activeTimer,
      date: currentDate,
      tasks: {
        coding: latestTimersRef.current.coding,
        interview: latestTimersRef.current.interview,
        job: latestTimersRef.current.job,
      },
    };
    const res = await POST("dashboard/", data);

    if (res) {
      messageApi.open({
        type: "success",
        content: "Timer data saved successfully",
      });
    }
  }, [activeTimer]);

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
        console.log("OK");
        setTimers(defaultTimer);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const logoutHandler = () => {
    saveTimerDataToDB();
    setActiveTimer(null);
    localStorage.clear();
    navigate("/auth");
  };

  const actionOnVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      saveTimerDataToDB();
    }
  };

  useEffect(() => {
    latestTimersRef.current = timers;
    document.addEventListener("visibilitychange", actionOnVisibilityChange);
    return () => {
      document.removeEventListener(
        "visibilitychange",
        actionOnVisibilityChange
      );
    };
  }, [timers]);

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
