type Image = {
  id: string;
  width: number;
  height: number;
  description: string;
  alt_description: string;
  urls: {
    regular: string;
  };
};

export default Image;
