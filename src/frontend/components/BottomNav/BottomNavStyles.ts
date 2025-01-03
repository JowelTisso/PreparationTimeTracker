import { Menu } from "antd";
import styled from "styled-components";

export const BottomNavContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  z-index: 1000;

  .menu-header {
    display: none;
  }

  @media screen and (min-width: 800px) {
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .menu-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      .logo {
        width: 23px;
        height: 23px;
      }
      p {
        font-size: 1.2rem;
      }
    }
  }
`;

export const MenuWrapper = styled(Menu)`
  display: "flex";
  .menu-item {
    flex: 1;

    @media screen and (min-width: 800px) {
      display: flex;
      align-items: center;
      height: 50px;
    }
  }
`;
