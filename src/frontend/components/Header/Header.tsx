import { HeaderWrapper } from "./HeaderStyles";
import { Spin } from "antd";
import { CheckCircleTwoTone, LoadingOutlined } from "@ant-design/icons";

type PropType = {
  title: string;
  loading?: {
    spin: boolean;
    tick: boolean;
  };
  isDashboard?: boolean;
};

const Header = ({ title, loading, isDashboard = false }: PropType) => {
  return (
    <HeaderWrapper>
      <div className="title-wrapper">
        <p>{title}</p>
        <div className="loading-wrapper">
          {loading?.spin && (
            <Spin
              indicator={<LoadingOutlined spin />}
              size="small"
              style={{
                width: "20px",
              }}
            />
          )}
          {loading?.tick && <CheckCircleTwoTone twoToneColor="#52c41a" />}
        </div>
      </div>
      {isDashboard && <p className="dedicated-time">10 hours</p>}
    </HeaderWrapper>
  );
};

export default Header;
