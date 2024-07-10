import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    c: 0,
    user:null,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  },
  reducers: {
    increment: (state) => {
      state.c += 1;
    },
    decrement: (state) => {
      state.c -= 1;
    },
    rest:(state) =>{
        state.c = 0;
    },
    incrementByAmout:(state,action) =>{
        state.c += action.payload;
    },
    setUser:(state,action)=>{
      state.user = action.payload.user;
      state.token = action.payload.token;
      // localStorage.setItem("token",JSON.stringify(action.payload.token));
      },
      logout:(state)=>{
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        }
        
  },
});

export const { increment, decrement , rest ,incrementByAmout ,setUser } = userSlice.actions;
