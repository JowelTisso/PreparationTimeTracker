import { createSlice } from "@reduxjs/toolkit";

interface LogsState {
  data: LogType[];
}

export type LogType = {
  date: string;
  tasks: {
    coding: number;
    interview: number;
    job: number;
  };
};

const initialState: LogsState = {
  data: [],
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    updateLogs: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateLogs } = logSlice.actions;
export default logSlice.reducer;
