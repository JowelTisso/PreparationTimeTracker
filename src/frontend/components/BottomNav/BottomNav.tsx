import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavContainer, MenuWrapper } from "./BottomNavStyles";
import { Divider } from "antd";
import logo from "../../../assets/favicon.png";

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

  function isMobile() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile;
  }

  const items = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <AppstoreOutlined />,
      className: "menu-item",
    },
    {
      label: "Calendar",
      key: "calendar",
      icon: <CalendarOutlined />,
      className: "menu-item",
    },
    {
      label: "Logs",
      key: "logs",
      icon: <FileTextOutlined />,
      className: "menu-item",
    },
  ];

  useEffect(() => {
    setCurrentTab(location.pathname.replace("/", ""));
  }, []);

  return (
    <BottomNavContainer>
      <div className="menu-header">
        <img className="logo" src={logo} alt="logo" />
        <p>Preparation Tracker</p>
      </div>
      {!isMobile() && <Divider />}
      <MenuWrapper
        onClick={(e) => navigateTo(e.key)}
        selectedKeys={[currentTab]}
        mode={isMobile() ? "horizontal" : "vertical"}
        theme="light"
        items={items}
      />
    </BottomNavContainer>
  );
};

export default BottomNav;
