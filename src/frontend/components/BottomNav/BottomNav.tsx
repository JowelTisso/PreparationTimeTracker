import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setCurrentTab(location.pathname.replace("/", ""));
  }, []);

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

  return (
    <BottomNavContainer>
      <MenuWrapper
        onClick={(e) => navigateTo(e.key)}
        selectedKeys={[currentTab]}
        mode="horizontal"
        theme="light"
        items={items}
      />
    </BottomNavContainer>
  );
};

export default BottomNav;
