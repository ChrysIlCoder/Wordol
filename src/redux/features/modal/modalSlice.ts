import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IModalInitalState {
  startscreen: boolean;
  not_box_message: {message: string; exp_time: number | undefined};
}

const initialState: IModalInitalState = {
  startscreen: true,
  not_box_message: {message: '', exp_time: 0},
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setStartScreen: (state, action) => {
      state.startscreen = action.payload
    },
    setNotBoxMessage: (state, action: PayloadAction<{message: string; exp_time: number | undefined}>) => {
      state.not_box_message = {...action.payload}
    },
  }
})

const getModals = ({ modal }: { modal: IModalInitalState }) => modal

export const modalSelector = {
  getModals,
}

export const { actions, reducer } = modalSlice