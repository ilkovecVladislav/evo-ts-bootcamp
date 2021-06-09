import { configureStore, combineReducers } from '@reduxjs/toolkit';

import photosReducer from 'reducers/photos';
import favouriteReducer from 'reducers/favourite';

export const rootReducer = combineReducers({
  photos: photosReducer,
  favourite: favouriteReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
