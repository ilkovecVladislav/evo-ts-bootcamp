import { FC } from 'react';

import PhotosGallery from './PhotosGallery';
import Form from './Form';

const PhotosTab: FC = () => (
  <div>
    <Form />
    <PhotosGallery />
  </div>
);

export default PhotosTab;
