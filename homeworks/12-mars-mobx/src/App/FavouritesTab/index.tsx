import { FC, useCallback } from "react";
import { useStore } from "store";
import Photo from "components/Photo";
import { observer } from "mobx-react-lite";
import { Photo as PhotoType } from "types/Photo";
import { PhotosContainer, TextLabel } from "../App.styled";

const FavouritesTab: FC = observer(() => {
  const { add, remove, photos, favouritePhotosId } = useStore("Favourites");

  const handleFavourite = useCallback(
    (isFavourite: boolean, photo: PhotoType) => {
      if (isFavourite) {
        remove(photo.id);
      } else {
        add(photo);
      }
    },
    [add, remove]
  );

  if (photos.length > 0) {
    return (
      <PhotosContainer>
        {photos.map((photo) => (
          <Photo
            key={photo.id}
            data={photo}
            isFavourite={favouritePhotosId.includes(photo.id)}
            onFavouriteClick={handleFavourite}
          />
        ))}
      </PhotosContainer>
    );
  }

  return <TextLabel>{photos}</TextLabel>;
});

export default FavouritesTab;
