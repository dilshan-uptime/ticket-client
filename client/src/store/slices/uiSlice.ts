import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ViewMode } from "@shared/schema";

interface UIState {
  viewMode: ViewMode;
  isSidebarOpen: boolean;
}

const initialState: UIState = {
  viewMode: "card",
  isSidebarOpen: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { setViewMode, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
