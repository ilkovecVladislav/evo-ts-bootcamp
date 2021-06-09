import { FC, useState } from 'react';

import { Navigation, NavigationItem } from './App.styled';
import PhotosTab from './PhotosTab';
import FavouritesTab from './FavouritesTab';

const App: FC = () => {
  const [isPhotosActive, setIsPhotosActive] = useState(true);

  const handlePhotosClick = () => {
    setIsPhotosActive(true);
  };

  const handleFavouritesClick = () => {
    setIsPhotosActive(false);
  };

  return (
    <div>
      <nav>
        <Navigation>
          <NavigationItem className={isPhotosActive ? 'active' : ''} onClick={handlePhotosClick}>
            Photos
          </NavigationItem>
          <NavigationItem
            className={!isPhotosActive ? 'active' : ''}
            onClick={handleFavouritesClick}
          >
            Favourites
          </NavigationItem>
        </Navigation>
      </nav>
      {isPhotosActive ? <PhotosTab /> : <FavouritesTab />}
    </div>
  );
};

export default App;
