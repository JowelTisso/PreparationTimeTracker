import React, { createContext, useContext } from "react";
import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";

// Create a context for the global message API
const MessageContext = createContext<MessageInstance | null>(null);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook to use the global message API
export const useMessageApi = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageApi must be used within a MessageProvider");
  }
  return context;
};
