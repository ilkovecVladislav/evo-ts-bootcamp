import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useFavouritesPhotos, useFavouritesIds } from 'reducers/selectors';
import { addToFavourite, removeFromFavourite } from 'reducers/favourite';
import Photo from 'components/Photo';
import { PhotosContainer, TextLabel } from '../App.styled';

const FavouritesTab: FC = () => {
  const dispatch = useDispatch();
  const photos = useFavouritesPhotos();
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

  return <TextLabel>{photos}</TextLabel>;
};

export default FavouritesTab;
