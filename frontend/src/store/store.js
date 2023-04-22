import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { stateSlice } from './stateSlice';
import { searchSlice } from './searchSlice';

const rootReducer = combineReducers({
  currentState: stateSlice.reducer,
  searchValue: searchSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;