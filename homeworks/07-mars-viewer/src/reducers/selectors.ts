import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import type { RootState } from 'store';
import Photo from 'types/Photo';

const selectedSolSelector = (state: RootState) => state.photos.selectedSol;
const solsSelector = (state: RootState) => state.photos.sols;
const favouritesSelector = (state: RootState) => state.favourite.list;

const currentSolPhotosSelector = createSelector(
  selectedSolSelector,
  solsSelector,
  (selectedSol, allSols) => {
    const selectedSolsPhotos: Photo[] | undefined = allSols[selectedSol];

    if (selectedSolsPhotos && selectedSolsPhotos.length > 0) {
      return selectedSolsPhotos;
    }
    if (selectedSolsPhotos && selectedSolsPhotos.length === 0) {
      return 'No photos for this sol :(';
    }

    return 'Photos are not loaded';
  },
);

const favouritesPhotosSelector = createSelector(
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

export const useIsLoading = (): boolean =>
  useSelector((state: RootState) => state.photos.isLoading);
export const useSelectedSol = (): string => useSelector(selectedSolSelector);
export const useFavouritesIds = (): number[] => useSelector(favouritesSelector);
export const useCurrentSolPhotos = (): string | Photo[] => useSelector(currentSolPhotosSelector);
export const useFavouritesPhotos = (): string | Photo[] => useSelector(favouritesPhotosSelector);
