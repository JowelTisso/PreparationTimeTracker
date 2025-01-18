import { Button, Checkbox, Modal, Input } from "antd";
import styled from "styled-components";
import { COLORS } from "../../utils/Colors";
const { TextArea } = Input;

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 110px;
  @media screen and (min-width: 800px) {
    height: 670px;
    width: 80%;
    margin-left: 18%;
    margin-right: 10%;
  }
`;

export const CalendarContainer = styled.div`
  .custom-checkbox-container {
    margin-top: 10px;
    height: 40%;
    text-align: center;
  }

  .ant-checkbox-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-checkbox {
    transform: scale(1.5);
  }

  .custom-calendar-header {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 15px;
  }

  @media screen and (min-width: 800px) {
    display: flex;
    align-items: center;
    transform: scale(0.9);
    gap: 50px;
  }
`;

const getColor = (isFuture: boolean, checked?: boolean, disabled?: boolean) => {
  if (isFuture) {
    return {
      backgroundColor: COLORS.checkbox.bg_future,
      borderColor: COLORS.checkbox.border,
    };
  } else if (checked && !disabled) {
    return {
      backgroundColor: COLORS.checkbox.bg_active,
      borderColor: COLORS.checkbox.bg_active,
    };
  } else if (checked && disabled) {
    return {
      backgroundColor: COLORS.checkbox.bg_disabled,
      borderColor: COLORS.checkbox.bg_disabled,
    };
  } else {
    return {
      backgroundColor: COLORS.checkbox.bg_unchecked,
      borderColor: COLORS.checkbox.border,
    };
  }
};

export const StyledCheckbox = styled(Checkbox).withConfig({
  shouldForwardProp: (prop) => !["isFuture"].includes(prop),
})<{ isFuture: boolean }>`
  .ant-checkbox-inner {
    background-color: ${({ isFuture, checked, disabled }) =>
      getColor(isFuture, checked, disabled).backgroundColor};
    border-color: ${({ isFuture, checked, disabled }) =>
      getColor(isFuture, checked, disabled).borderColor};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${COLORS.checkbox.bg_active} !important;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #fff;
  }

  .ant-checkbox-disabled .ant-checkbox-inner {
    opacity: 0.7;
  }
`;

export const BottomModal = styled(Modal)`
  @media screen and (max-width: 700px) {
    &.ant-modal {
      position: fixed;
      bottom: -20px;
      top: auto;
      left: 0;
      right: 0;
      margin: 0;
      width: 100%;
      max-width: 100%;
    }

    .ant-modal-content {
      border-radius: 24px 24px 0 0;
      padding: 24px;
      margin: 0;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
      background-color: #f8f9fa;
    }

    .ant-modal-header {
      border-bottom: none;
      padding-bottom: 0;
      background-color: transparent;
    }

    .ant-modal-title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }

    .ant-modal-body {
      padding: 16px 0;
    }

    .ant-modal-footer {
      border-top: none;
      padding-top: 0;
      background-color: transparent;
      text-align: right;
    }
  }
`;

export const StyledTextArea = styled(TextArea)`
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 12px;
  font-size: 14px;
  resize: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 12px;
  font-weight: 500;
  padding: 8px 20px;
  transition: all 0.3s ease;
  width: 120px;

  &:disabled {
    background-color: ${COLORS.c2};
    color: ${COLORS.c1};
  }
`;
