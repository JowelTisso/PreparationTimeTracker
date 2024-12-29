import React from "react";
import { LogItemWrapper } from "./LogsStyles";
import { Progress } from "antd";
import { COLORS } from "../../utils/Colors";
import { LogType } from "../../reducer/logSlice";
import { calculatePercent } from "../Dashboard/Dashboard";

type PropType = {
  log: LogType;
};

const LogItem = ({ log }: PropType) => {
  const { date, tasks } = log;
  return (
    <LogItemWrapper>
      <div className="date-wrapper">
        <p>{date} :</p>
      </div>
      <div className="content-wrapper">
        {Object.entries(tasks).map(([title, time]) => {
          const hour = Math.floor(time / 3600);
          const minute = Math.floor((time % 3600) / 60);

          return (
            <div className="item">
              <p className="title">{title}</p>
              <p className="time">
                {hour} <span>hr</span> {minute ? minute : ""}
                {minute ? <span>min</span> : ""}
              </p>
              <div className="progress-bar">
                <Progress
                  percent={calculatePercent(
                    time,
                    title.includes("coding") ? 360 : 120
                  )}
                  size={{
                    height: 4,
                  }}
                  strokeColor={COLORS.Active}
                  showInfo={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </LogItemWrapper>
  );
};

export default LogItem;
