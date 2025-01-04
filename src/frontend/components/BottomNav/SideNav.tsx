import { Button, Layout } from "antd";
import { useState } from "react";
import logo from "../../../assets/favicon.png";
import { MenuItem } from "./BottomNav";
import { MenuWrapper, StyledLayout, TriggerContainer } from "./BottomNavStyles";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Sider } = Layout;

type SideNavProps = {
  items: MenuItem[];
  onClick: (e: any) => void;
  selectedKeys: string[];
};

const SideNav = ({ items, selectedKeys, onClick }: SideNavProps) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <StyledLayout>
      <Sider
        className="sider"
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={220}
      >
        <TriggerContainer collapsed={collapsed}>
          <Button
            type="text"
            className="trigger"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </TriggerContainer>
        <div className="menu-header">
          <img className="logo" src={logo} alt="logo" />
          {!collapsed && <p>Preparation Tracker</p>}
        </div>

        <MenuWrapper
          mode="inline"
          selectedKeys={selectedKeys}
          onClick={onClick}
          items={items}
        />
      </Sider>
    </StyledLayout>
  );
};

export default SideNav;
