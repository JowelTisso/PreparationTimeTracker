import styled from "styled-components";
import { COLORS } from "../../utils/Colors";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 400px;
  max-width: 100%;
`;

export const FormContainer = styled.div`
  flex: 1;
  padding: 40px;

  .login-form-button {
    color: ${COLORS.Secondary};
    background-color: ${COLORS.Idle};
    &:hover {
      color: ${COLORS.white};
      background-color: ${COLORS.Active} !important;
    }
  }

  .signup-link {
    color: ${COLORS.Active};

    &:hover {
      color: ${COLORS.Secondary} !important;
    }
  }
  &:active {
    background-color: white;
  }
`;
