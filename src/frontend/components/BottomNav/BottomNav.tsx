import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavContainer, MenuWrapper } from "./BottomNavStyles";

const BottomNav: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("dashboard");

  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (menu: string) => {
    if (menu === "dashboard") {
      navigate(`/`);
    } else {
      navigate(`/${menu}`);
    }
    setCurrentTab(menu);
  };

  const tabWidth = Math.round(window.innerWidth / 3);

  useEffect(() => {
    setCurrentTab(location.pathname.replace("/", ""));
  }, []);

  return (
    <BottomNavContainer>
      <MenuWrapper
        onClick={(e) => navigateTo(e.key)}
        selectedKeys={[currentTab]}
        mode="horizontal"
        theme="light"
        tabWidth={tabWidth}
      >
        <Menu.Item
          className="menu-item"
          key="dashboard"
          icon={<AppstoreOutlined />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          className="menu-item"
          key="calendar"
          icon={<CalendarOutlined />}
        >
          Calendar
        </Menu.Item>
        <Menu.Item className="menu-item" key="logs" icon={<FileTextOutlined />}>
          Logs
        </Menu.Item>
      </MenuWrapper>
    </BottomNavContainer>
  );
};

export default BottomNav;
