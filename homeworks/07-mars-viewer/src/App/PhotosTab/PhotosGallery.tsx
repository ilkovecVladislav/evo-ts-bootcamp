import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Photo from 'components/Photo';
import { addToFavourite, removeFromFavourite } from 'reducers/favourite';
import { useIsLoading, useCurrentSolPhotos, useFavouritesIds } from 'reducers/selectors';
import { PhotosContainer, TextLabel } from '../App.styled';

const PhotosGallery: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useIsLoading();
  const photos = useCurrentSolPhotos();
  const favouritesIds = useFavouritesIds();

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

  if (Array.isArray(photos)) {
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

  return <TextLabel>{isLoading ? 'Loading...' : photos}</TextLabel>;
};

export default PhotosGallery;
