import { Menu } from "antd";
import styled from "styled-components";

export const MenuWrapper = styled(Menu)<{ tabWidth: number }>`
  display: "flex";
  .menu-item {
    flex: 1;
    /* width: ${({ tabWidth }) => `${tabWidth}px`}; */
  }
`;
