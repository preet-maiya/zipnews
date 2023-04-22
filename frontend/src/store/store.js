import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { stateSlice } from './stateSlice';

const rootReducer = combineReducers({
  currentState: stateSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;