import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { PhotoJson, Photo } from 'types/Photo';

interface PhotosState {
  selectedSol: string;
  isLoading: boolean;
  sols: {
    [key: string]: Photo[];
  };
}

const initialState: PhotosState = {
  isLoading: false,
  selectedSol: '1',
  sols: {},
};

export const loadPhotos = createAsyncThunk('photos/loadPhotos', async (sol: string) => {
  if (process.env.REACT_APP_API_KEY) {
    const params = new URLSearchParams({
      sol,
      api_key: process.env.REACT_APP_API_KEY,
    }).toString();
    const { photos }: { photos: PhotoJson[] } = await fetch(
      `${'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos'}?${params}`,
    ).then((response) => response.json());

    const normalizedPhotos = photos.map((item) => ({
      id: item.id,
      sol: item.sol,
      imgSrc: item.img_src,
      earthDate: item.earth_date,
      cameraName: item.camera.full_name,
      roverName: item.rover.name,
    }));

    return Promise.resolve({ sol, photos: normalizedPhotos });
  }

  return Promise.reject(new Error('Missing API KEY'));
});

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setSol: (state, action: PayloadAction<string>) => {
      state.selectedSol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loadPhotos.fulfilled,
        (state, action: PayloadAction<{ sol: string; photos: Photo[] }>) => {
          state.isLoading = false;
          state.sols[action.payload.sol] = action.payload.photos;
        },
      );
  },
});

export const { setSol } = photosSlice.actions;

export default photosSlice.reducer;
