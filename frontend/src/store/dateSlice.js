import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs';
import {Dayjs} from 'dayjs'

// reference: https://react-redux.js.org/tutorials/quick-start
export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    value: new Date(),
  },
  reducers: {
    // state
    changeDate: (state, action) => {
        state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeDate } = dateSlice.actions

export default dateSlice.reducer