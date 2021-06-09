const CONTAINER_HEIGHT = 400;

export const getBarHeight = (value: number, scaling: number): number =>
  ((CONTAINER_HEIGHT * value) / 100) * scaling;

export const getScalingFactor = (length: number): number => {
  if (length <= 30) {
    return 1;
  }

  if (length >= 31 && length <= 50) {
    return 0.6;
  }

  if (length >= 51 && length <= 110) {
    return 0.3;
  }

  if (length >= 111 && length <= 300) {
    return 0.1;
  }

  if (length >= 301 && length <= 600) {
    return 0.05;
  }

  return 0.003;
};
