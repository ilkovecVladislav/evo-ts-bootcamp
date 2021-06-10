import { action, computed, makeAutoObservable } from "mobx";
import { PhotoJson, Photo } from "types/Photo";
import { createContext } from "./storeUtils";

const MARS_API_KEY = "aZ6TQDnvVnCzV1OsLt3ExZDIa0CpV38lvafz9dZi";

class Sols {
  selectedSol: string = "1";
  isLoading: boolean = false;
  sols: {
    [key: string]: Photo[];
  } = {};

  constructor() {
    makeAutoObservable(this, {
      setSol: action.bound,
      loadSolPhotos: action.bound,
      currentSolPhotos: computed,
    });
  }

  get currentSolPhotos(): Photo[] | undefined {
    return this.sols[this.selectedSol];
  }

  setSol(newSol: string) {
    this.selectedSol = newSol;
  }

  async loadSolPhotos() {
    this.isLoading = true;

    try {
      const params = new URLSearchParams({
        sol: this.selectedSol,
        api_key: MARS_API_KEY,
      }).toString();
      const { photos }: { photos: PhotoJson[] } = await fetch(
        `${"https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos"}?${params}`
      ).then((response) => response.json());

      const normalizedPhotos = photos.map((item) => ({
        id: item.id,
        sol: item.sol,
        imgSrc: item.img_src,
        earthDate: item.earth_date,
        cameraName: item.camera.full_name,
        roverName: item.rover.name,
      }));

      this.sols[this.selectedSol] = normalizedPhotos;
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}

class Favourites {
  photos: Photo[] = [];

  constructor() {
    makeAutoObservable(this, {
      add: action.bound,
      remove: action.bound,
      favouritePhotosId: computed,
    });
  }

  get favouritePhotosId(): number[] {
    return this.photos.map((photo) => photo.id);
  }
  add(episode: Photo) {
    this.photos.push(episode);
  }

  remove(id: number) {
    this.photos = this.photos.filter((photo) => photo.id !== id);
  }
}

export const { StoreProvider, useStore } = createContext({
  Sols: new Sols(),
  Favourites: new Favourites(),
});
