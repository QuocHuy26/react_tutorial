import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: ''
  },
  reducers: {
    setUserToken(state, userToken) {
        state.token = userToken.payload;
    },
    removeUserToken(state){
        state.token = ''
    }
  }
})
  
export const { setUserToken, removeUserToken } = userSlice.actions;
export default userSlice.reducer;