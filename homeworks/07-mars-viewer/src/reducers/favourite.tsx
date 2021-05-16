import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouriteState {
  list: number[];
}

const initialState: FavouriteState = {
  list: [],
};

export const counterSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addToFavourite: (state, action: PayloadAction<number>) => {
      state.list.push(action.payload);
    },
    removeFromFavourite: (state, action: PayloadAction<number>) => {
      const filteredFavouriteList = state.list.filter((item) => item !== action.payload);
      state.list = filteredFavouriteList;
    },
  },
});

export const { addToFavourite, removeFromFavourite } = counterSlice.actions;

export default counterSlice.reducer;
