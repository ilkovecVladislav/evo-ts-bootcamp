import { FC, useState } from 'react';

import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import unicornIcon from 'assets/icons/unicorn.svg';
import PhotoType from 'types/Photo';
import { Figure, Image, FigureCaption, FavouriteButton } from './Photo.styled';

type Props = {
  data: PhotoType;
  isFavourite: boolean;
  onFavouriteClick: (value: boolean, id: number) => void;
};

const Photo: FC<Props> = ({ data, isFavourite, onFavouriteClick }) => {
  const { id, img_src, camera, rover, earth_date } = data;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleFavouriteClick = () => {
    onFavouriteClick(!isFavourite, id);
  };

  const handleLoadImage = () => {
    setIsImageLoaded(true);
  };

  return (
    <Figure>
      <FavouriteButton type="button" onClick={handleFavouriteClick}>
        <HeartIcon className={isFavourite ? 'active' : ''} />
      </FavouriteButton>
      {!isImageLoaded && <Image src={unicornIcon} alt="placeholder" />}
      <Image
        src={img_src}
        data-set={unicornIcon}
        loading="lazy"
        alt={camera.full_name}
        onLoad={handleLoadImage}
      />
      <FigureCaption>
        <p>
          Rover: {rover.name}, Camera: {camera.full_name}, Photo date:{' '}
          <time dateTime={earth_date}>{new Date(earth_date).toLocaleDateString('ru-RU')}</time>
        </p>
      </FigureCaption>
    </Figure>
  );
};

export default Photo;
