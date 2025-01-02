import { Button, Checkbox, Modal, Input } from "antd";
import styled from "styled-components";
const { TextArea } = Input;

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 110px;
  height: 100%;
  @media screen and (min-width: 800px) {
    margin-top: 90px;
    height: 90%;
  }
`;

export const CalendarContainer = styled.div`
  .ant-picker-calendar {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  .custom-checkbox-container {
    height: 60%;
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
    margin-bottom: 5px;
  }
`;

export const StyledCheckbox = styled(Checkbox)<{ isFuture: boolean }>`
  .ant-checkbox-inner {
    background-color: ${({ isFuture, checked, disabled }) =>
      isFuture
        ? "#ffffff"
        : checked && !disabled
        ? "#52c41a" // Green for checked and enabled
        : checked && disabled
        ? "#b7eb8f"
        : "#fff1b8"}; // Light yellow for unchecked
    border-color: ${({ isFuture, checked, disabled }) =>
      isFuture
        ? "#d9d9d9"
        : checked && !disabled
        ? "#52c41a" // Green border for checked and enabled
        : checked && disabled
        ? "#b7eb8f"
        : "#d9d9d9"}; // Default border for unchecked
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #52c41a !important;
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

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
  }
`;
