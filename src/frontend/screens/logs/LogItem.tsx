import { LogItemWrapper } from "./LogsStyles";
import { Progress } from "antd";
import { COLORS } from "../../utils/Colors";
import { Log } from "../../reducer/logSlice";
import { calculatePercent } from "../Dashboard/Dashboard";
import { upperFirst } from "lodash";
import { formatDate } from "../../utils/helper";

type PropType = {
  log: Log;
};

const LogItem = ({ log }: PropType) => {
  const { date, tasks } = log;
  const dateString = new Date(date);

  return (
    <LogItemWrapper>
      <p className="date-wrapper">{formatDate(dateString)} :</p>
      <div className="content-wrapper">
        {Object.entries(tasks).map(([title, time]) => {
          const totalSecondOfCoding = 21600;
          const totalSecondOfOtherTask = 7200;
          const totalTimeInSeconds = title.includes("coding")
            ? totalSecondOfCoding
            : totalSecondOfOtherTask;

          const timePassed = totalTimeInSeconds - time;
          const hour = Math.floor(timePassed / 3600);
          const minute = Math.floor((timePassed % 3600) / 60);

          return (
            <div className="item" key={title}>
              <p className="title">{upperFirst(title)}</p>
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
