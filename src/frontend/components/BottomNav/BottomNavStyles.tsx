import { Menu } from "antd";
import styled from "styled-components";

export const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  z-index: 1000;

  @media screen and (min-width: 800px) {
    width: 70%;
    margin: 0 auto;
  }
`;

export const MenuWrapper = styled(Menu)`
  display: "flex";
  .menu-item {
    flex: 1;
  }
`;
