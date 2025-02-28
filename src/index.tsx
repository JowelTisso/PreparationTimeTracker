import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./frontend/utils/axiosConfig";
import { MessageProvider } from "./frontend/context/MessageProvider";
import { Provider } from "react-redux";
import store from "./frontend/store/store";
import { TimerProvider } from "./frontend/context/TimerProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <MessageProvider>
        <TimerProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </TimerProvider>
      </MessageProvider>
    </Router>
  </React.StrictMode>
);
