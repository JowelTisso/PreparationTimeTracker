import { Button, Layout, Typography } from "antd";
import { useState } from "react";
import logo from "../../../assets/favicon.png";
import { MenuItem } from "./BottomNav";
import { MenuWrapper, StyledLayout, TriggerContainer } from "./BottomNavStyles";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { getLocalStorage } from "../../utils/helper";

const { Sider } = Layout;

type SideNavProps = {
  items: MenuItem[];
  onClick: (e: any) => void;
  selectedKeys: string[];
};

const SideNav = ({ items, selectedKeys, onClick }: SideNavProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const userData = JSON.parse(getLocalStorage("userData") || "{}");
  const { Text } = Typography;

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
          {!collapsed && (
            <Text className="username" ellipsis>
              {userData.name}
            </Text>
          )}
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
