import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavContainer, MenuWrapper } from "./BottomNavStyles";
import SideNav from "./SideNav";
export interface MenuItem {
  label: string;
  key: string;
  icon: JSX.Element;
  className: string;
  disabled?: boolean;
}

export const isMobile = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isMobile;
};

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

  const items: MenuItem[] = [
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
      {isMobile() ? (
        <MenuWrapper
          onClick={(e) => navigateTo(e.key)}
          selectedKeys={[currentTab]}
          mode={"horizontal"}
          items={items}
        />
      ) : (
        <SideNav
          items={items}
          selectedKeys={[currentTab]}
          onClick={(e) => navigateTo(e.key)}
        />
      )}
    </BottomNavContainer>
  );
};

export default BottomNav;
