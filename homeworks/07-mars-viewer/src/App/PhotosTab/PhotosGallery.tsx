import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Photo from 'components/Photo';
import { addToFavourite, removeFromFavourite } from 'reducers/favourite';
import { currentSolPhotosSelector, favouritesSelector } from 'reducers/selectors';
import type { RootState } from 'store';
import { PhotosContainer, TextLabel } from '../App.styled';

const PhotosGallery: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.photos.isLoading);
  const photos = useSelector(currentSolPhotosSelector);
  const favouritesIds = useSelector(favouritesSelector);

  const handleFavourite = useCallback(
    (isFavourite: boolean, id: number) => {
      if (isFavourite) {
        dispatch(addToFavourite(id));
      } else {
        dispatch(removeFromFavourite(id));
      }
    },
    [dispatch],
  );

  if (photos && photos.length > 0) {
    return (
      <PhotosContainer>
        {photos.map((photo) => (
          <Photo
            key={photo.id}
            data={photo}
            isFavourite={favouritesIds.includes(photo.id)}
            onFavouriteClick={handleFavourite}
          />
        ))}
      </PhotosContainer>
    );
  }

  if (isLoading) {
    return <TextLabel>Loading...</TextLabel>;
  }

  if (photos && photos?.length === 0) {
    return <TextLabel>No photos for this sol </TextLabel>;
  }

  return <TextLabel>Photos are not loaded</TextLabel>;
};

export default PhotosGallery;
