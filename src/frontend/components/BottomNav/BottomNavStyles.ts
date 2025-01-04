import { Layout, Menu } from "antd";
import styled from "styled-components";
import { COLORS } from "../../utils/Colors";

export const BottomNavContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  z-index: 1000;
`;

export const StyledLayout = styled(Layout)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  .logo {
    width: 23px;
    height: 23px;
  }

  .sider {
    background-color: ${COLORS.nav_background};
  }

  .menu-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1rem;
    padding: 10px !important;

    .ant-menu-title-content {
      margin-left: 0;
    }
  }

  .menu-item {
    height: 50px;
  }
`;

export const TriggerContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["collapsed"].includes(prop),
})<{ collapsed: boolean }>`
  display: flex;
  justify-content: ${({ collapsed }) => (collapsed ? "center" : "end")};

  .username {
    font-size: 1.1rem;
    margin: 7px;
    width: 65%;
    font-weight: 500;
  }

  .trigger {
    background-color: ${COLORS.white};
    margin-top: 5px;
    margin-right: ${({ collapsed }) => (collapsed ? 0 : "5px")};
    margin-bottom: ${({ collapsed }) => (collapsed ? "10px" : 0)};
  }
`;

export const MenuWrapper = styled(Menu)`
  display: "flex";
  background-color: ${COLORS.nav_background};

  .menu-item {
    flex: 1;
  }
`;
