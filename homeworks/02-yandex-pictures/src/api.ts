import Image from "./types";

const BASE_URL = "https://api.unsplash.com";

const randomPhotosUrl = `${BASE_URL}/photos/random?client_id=${process.env.REACT_APP_API_KEY}&count=30`;
const searchPhotosUrl = (query: string): string =>
  `${BASE_URL}/search/photos?page=1&query=${query}&client_id=${process.env.REACT_APP_API_KEY}&per_page=30`;

export const getRandomPhotos = (): Promise<Image[]> =>
  fetch(randomPhotosUrl).then((response) => response.json());

export const searchPhoto = (query: string): Promise<Image[]> =>
  fetch(searchPhotosUrl(query))
    .then((response) => response.json())
    .then((result) => result.results);
