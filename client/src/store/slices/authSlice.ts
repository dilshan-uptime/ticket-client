import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@shared/schema";

interface AuthState {
  user: User | null;
  tempUser: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  requires2FA: boolean;
  is2FAVerified: boolean;
}

const initialState: AuthState = {
  user: null,
  tempUser: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  requires2FA: false,
  is2FAVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.tempUser = null;
      state.requires2FA = false;
    },
    setTempUser: (state, action: PayloadAction<User>) => {
      state.tempUser = action.payload;
      state.requires2FA = action.payload.twoFactorEnabled === "true";
      state.isLoading = false;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    set2FAVerified: (state, action: PayloadAction<boolean>) => {
      state.is2FAVerified = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.tempUser = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.requires2FA = false;
      state.is2FAVerified = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setTempUser, setAccessToken, set2FAVerified, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
