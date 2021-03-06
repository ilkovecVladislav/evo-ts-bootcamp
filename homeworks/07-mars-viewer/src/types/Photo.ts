export type PhotoJson = {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
  camera: {
    id: number;
    rover_id: number;
    full_name: string;
    name: string;
  };
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
};

export type Photo = {
  id: number;
  sol: number;
  imgSrc: string;
  earthDate: string;
  cameraName: string;
  roverName: string;
};
