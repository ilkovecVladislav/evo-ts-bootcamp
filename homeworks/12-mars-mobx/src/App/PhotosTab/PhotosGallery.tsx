import { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import Photo from "components/Photo";
import { Photo as PhotoType } from "types/Photo";
import { PhotosContainer, TextLabel } from "../App.styled";

const PhotosGallery: FC = observer(() => {
  const { currentSolPhotos, isLoading } = useStore("Sols");
  const { add, remove, favouritePhotosId } = useStore("Favourites");

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

  if (currentSolPhotos && currentSolPhotos.length > 0) {
    return (
      <PhotosContainer>
        {currentSolPhotos.map((photo) => (
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

  if (isLoading) {
    return <TextLabel>Loading...</TextLabel>;
  }

  if (currentSolPhotos && currentSolPhotos?.length === 0) {
    return <TextLabel>No photos for this sol</TextLabel>;
  }

  return <TextLabel>Photos are not loaded</TextLabel>;
});

export default PhotosGallery;
