import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import loanReducer from './slices/loanSlice';
import serviceReducer from './slices/serviceSlice';

const appReducer = combineReducers({ auth: authReducer, user: userReducer, loan: loanReducer, service: serviceReducer });

export type RootState = ReturnType<typeof appReducer>;

// Clear ALL state on logout/fullReset — not just the auth slice
const rootReducer = (state: RootState | undefined, action: any): RootState => {
  if (action.type === 'auth/logout' || action.type === 'auth/fullReset') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({ reducer: rootReducer });
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
