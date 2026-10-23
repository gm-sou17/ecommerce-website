import { createSlice } from '@reduxjs/toolkit'


// Define the initial state using that type
const initialState = {
   user : null 
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    setUserDetails : (state ,action) => {
        state.user = action.payload
        // console.log("action",action.payload)

    }
    
  }
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions



export default userSlice.reducer