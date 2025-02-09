import styled from "styled-components";
import { COLORS } from "../../utils/Colors";

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${COLORS.white};
  z-index: 3;
  p {
    font-size: 1.7rem;
    margin: 10px;
  }
  .title-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    margin-left: 15px;
    justify-content: center;
  }

  .loading-wrapper {
    width: 20px;
  }

  .dedicated-time {
    font-weight: 400;
    border: 2px solid ${COLORS.Active};
    width: max-content;
    padding: 12px;
    margin-top: 20px;
    border-radius: 15px;
    background-color: #fffbf7;
    flex: 1;
  }

  @media screen and (min-width: 800px) {
    left: 50px;
  }
`;
