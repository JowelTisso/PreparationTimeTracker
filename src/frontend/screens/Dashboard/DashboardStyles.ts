import styled from "styled-components";
import { COLORS } from "../../utils/Colors";

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 170px;
  p {
    color: ${COLORS.Secondary};
  }

  @media screen and (min-width: 800px) {
    width: 70%;
    margin-left: 18%;
    margin-right: 10%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  height: min-content;
  align-self: flex-end;
  width: 100%;
  justify-content: center;
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["isChecked"].includes(prop),
})<{ isChecked: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: none;
  font-size: 1.3rem;
  font-weight: 500;
  cursor: pointer;
  font-family: "Nunito Sans", sans-serif;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease-in-out;
  -webkit-tap-highlight-color: transparent;

  color: ${({ isChecked }) => (isChecked ? COLORS.white : COLORS.Secondary)};

  background-color: ${({ isChecked }) =>
    isChecked ? COLORS.Active : COLORS.Idle};

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  }
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 15px;
  margin-right: 15px;

  .wrapper {
    font-size: 1.5rem;
    gap: 50px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .title {
    font-size: 1.5rem;
  }

  .timer {
    .time-label {
      font-size: 1rem;
    }
  }
`;

const LogoutBtnWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 10px;
  z-index: 4;

  @media screen and (min-width: 800px) {
    left: 320px;
  }
`;

const ResetBtnWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  right: 0;
  top: 10px;
  z-index: 4;
  @media screen and (min-width: 800px) {
    right: 220px;
  }
`;

export {
  ToggleButton,
  Wrapper,
  ButtonWrapper,
  TimerWrapper,
  ResetBtnWrapper,
  LogoutBtnWrapper,
};
