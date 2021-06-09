import { createSelector } from 'reselect';

import type { RootState } from 'store';
import { Photo } from 'types/Photo';

export const selectedSolSelector = (state: RootState): string => state.photos.selectedSol;
const solsSelector = (state: RootState) => state.photos.sols;
export const favouritesSelector = (state: RootState): number[] => state.favourite.list;

export const currentSolPhotosSelector = createSelector(
  selectedSolSelector,
  solsSelector,
  (selectedSol, allSols) => {
    const selectedSolsPhotos: Photo[] | undefined = allSols[selectedSol];

    return selectedSolsPhotos;
  },
);

export const favouritesPhotosSelector = createSelector(
  favouritesSelector,
  solsSelector,
  (favouritesIds, allSols) => {
    if (favouritesIds.length === 0) {
      return 'No favourites photos, add some!';
    }

    const allPhotos = Object.values(allSols).flat();

    const photos = allPhotos.filter((photo) => favouritesIds.includes(photo.id));

    return photos.length > 0 ? photos : 'No such photos found';
  },
);
