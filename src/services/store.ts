import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './reducers/auth';
import categoryReducer from './reducers/category';
import modalReducer from './reducers/modal';
import photoReducer from './reducers/photo';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    modal: modalReducer,
    photo: photoReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export default store;
