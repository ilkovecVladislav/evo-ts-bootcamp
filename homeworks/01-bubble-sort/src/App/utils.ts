import { AppState } from "../types";

export const generateArray = (length: number = 30): number[] =>
  Array.from(Array(length))
    .map((_, index) => (index + 1) * 3)
    .sort(() => Math.random() - 0.5);

const swap = (arr: number[], a: number, b: number): void => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

const delay = (timer: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 400 - timer));
export const sortArray = async (
  array: number[],
  updateState: <K extends keyof AppState>(state: Pick<AppState, K>) => void,
  settings: { speed: number; pause: boolean; isActive: boolean }
) => {
  const copyArr = [...array];
  const arrLength = copyArr.length;

  function pause(): Promise<void> {
    return new Promise((resolve) => {
      if (settings.pause) {
        return setTimeout(() => resolve(pause()), 300);
      } else {
        return resolve();
      }
    });
  }

  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < arrLength - i - 1; j++) {
      if (settings.pause) {
        await pause();
      }
      if (!settings.isActive) {
        break;
      }

      const a = copyArr[j];
      const b = copyArr[j + 1];
      if (a > b && settings.isActive) {
        swap(copyArr, j, j + 1);
        updateState({ renderData: [...copyArr] });
        await delay(settings.speed);
      }
    }
  }

  if (settings.isActive) {
    updateState({
      sorting: false,
      solved: true,
    });
  }
};
