import { combineReducers } from "@reduxjs/toolkit";
import { boardReducer } from "./features/board";
import { modalReducer } from "./features/modal";

export default combineReducers({
  board: boardReducer,
  modal: modalReducer,
})