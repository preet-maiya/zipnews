import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { stateSlice } from './stateSlice';

const rootReducer = combineReducers({
  currentState: stateSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;


/* How to use redux for state management

// import useSelector and useDispatch hook
// useDispatch is not required if you don't change the state on a given component
import { useSelector, useDispatch } from 'react-redux'

// Import the store and action creators
// make sure the path is correct
import store from "../../../store/store";
import { changeState } from "../../../store/stateSlice";

// Get the currentState from the store using useSelector
const state = useSelector((state) => state.currentState.value);

// Use dispatch to change the state (currentState)
const dispatch = useDispatch();

// Example of changing state in a dropdown menu
const handleChangeState = (e) => {
  const value = e.target.value;
  if (value) {
    dispatch(changeState(value));
  }
}


*/