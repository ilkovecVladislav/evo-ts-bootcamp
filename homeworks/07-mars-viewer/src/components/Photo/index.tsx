import { FC } from 'react';

import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import { Photo as PhotoType } from 'types/Photo';
import { Figure, Image, FigureCaption, FavouriteButton } from './Photo.styled';

type Props = {
  data: PhotoType;
  isFavourite: boolean;
  onFavouriteClick: (value: boolean, id: number) => void;
};

const Photo: FC<Props> = ({ data, isFavourite, onFavouriteClick }) => {
  const { id, imgSrc, cameraName, roverName, earthDate } = data;

  const handleFavouriteClick = () => {
    onFavouriteClick(!isFavourite, id);
  };

  return (
    <Figure>
      <FavouriteButton type="button" onClick={handleFavouriteClick}>
        <HeartIcon className={isFavourite ? 'active' : ''} />
      </FavouriteButton>
      <Image src={imgSrc} loading="lazy" alt={cameraName} />
      <FigureCaption>
        <p>
          Rover: {roverName}, Camera: {cameraName}, Photo date:{' '}
          <time dateTime={earthDate}>{new Date(earthDate).toLocaleDateString('ru-RU')}</time>
        </p>
      </FigureCaption>
    </Figure>
  );
};

export default Photo;
