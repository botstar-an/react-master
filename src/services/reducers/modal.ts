import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  show: boolean;
  key?: string;
  props?: any;
}
const initialState : ModalState = {
  show: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    showModal: (state, action: PayloadAction<any>) => {
      state.key = action.payload.key;
      state.props = action.payload.props;
      state.show = true;
    },
    closeModal: (state) => {
      state.show = false;
      state.key = '';
      state.props = {};
    }
  },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
