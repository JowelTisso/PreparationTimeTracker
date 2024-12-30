import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Log {
  tasks: {
    coding: number;
    interview: number;
    job: number;
  };
  _id: string;
  userId: string;
  date: string;
  __v: number;
  activeTimer: string;
}

interface Pagination {
  totalLogs: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface LogsResponse {
  logs: Log[];
  pagination: Pagination;
}

export const initialLogState: LogsResponse = {
  logs: [],
  pagination: {
    totalLogs: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  },
};

const logSlice = createSlice({
  name: "logState",
  initialState: initialLogState,
  reducers: {
    updateLogs: (state, action: PayloadAction<LogsResponse>) => {
      state.logs = action.payload.logs;
      state.pagination = action.payload.pagination;
    },
  },
});

export const { updateLogs } = logSlice.actions;
export default logSlice.reducer;
