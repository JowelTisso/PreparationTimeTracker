import React, { useState } from "react";
import styled from "styled-components";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MenuWrapper } from "./BottomNavStyles";

// Styled component for Bottom Navigation
const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  z-index: 1000;
`;

const ContentContainer = styled.div`
  padding: 16px;
  margin-bottom: 60px; // To avoid overlap with bottom nav
`;

const BottomNav: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("dashboard");

  const navigate = useNavigate();

  const navigateTo = (menu: string) => {
    console.log(menu);
    if (menu === "dashboard") {
      navigate(`/`);
    } else {
      navigate(`/${menu}`);
    }
    setCurrentTab(menu);
  };

  console.log(Math.round(window.innerWidth / 3));
  const tabWidth = Math.round(window.innerWidth / 3);

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
