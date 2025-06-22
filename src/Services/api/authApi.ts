import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import StaticUtils from "../../utils/StaticUtils";

// Async thunk for login
export const signin = createAsyncThunk(
  "user/signin",
  async (requestData: any, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `${StaticUtils.accountsURL}/signin`,
        requestData
      );
      console.log("API Signin Response →", res.data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (requestData: any, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `${StaticUtils.accountsURL}/signup`,
        requestData
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);
