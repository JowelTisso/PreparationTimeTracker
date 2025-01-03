import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

type completedDatesType = Record<
  string,
  {
    checked: boolean;
    note: string;
  }
>;

interface CalendarState {
  loading: {
    spin: boolean;
    tick: boolean;
  };
  currentDateString: string;
  completedDates: completedDatesType;
  notes: Record<string, string>;
  isModalOpen: boolean;
}

const initialCalendarState: CalendarState = {
  loading: {
    spin: false,
    tick: false,
  },
  currentDateString: dayjs().toISOString(),
  completedDates: {},
  notes: {},
  isModalOpen: false,
};

const calendarSlice = createSlice({
  name: "calendarState",
  initialState: initialCalendarState,
  reducers: {
    saveFetchedCompleteDates: (
      state,
      action: PayloadAction<completedDatesType>
    ) => {
      state.completedDates = action.payload;
    },
    updateCompleteDates: (
      state,
      action: PayloadAction<{
        dateString: string;
        checked: boolean;
      }>
    ) => {
      state.completedDates = {
        ...state.completedDates,
        [action.payload.dateString]: {
          checked: action.payload.checked,
          note: state.notes[action.payload.dateString] || "",
        },
      };
    },
    updateCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDateString = action.payload;
    },
    saveFetchedNotes: (
      state,
      action: PayloadAction<Record<string, string>>
    ) => {
      state.notes = action.payload;
    },
    updateNotes: (
      state,
      action: PayloadAction<{
        dateString: string;
        value: string;
      }>
    ) => {
      state.notes = {
        ...state.notes,
        [action.payload.dateString]: action.payload.value,
      };
    },
    updateModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    updateLoading: (
      state,
      action: PayloadAction<{ spin: boolean; tick: boolean }>
    ) => {
      state.loading = action.payload;
    },
  },
});

export const {
  saveFetchedCompleteDates,
  updateCompleteDates,
  updateCurrentDate,
  saveFetchedNotes,
  updateNotes,
  updateModalOpen,
  updateLoading,
} = calendarSlice.actions;
export default calendarSlice.reducer;
