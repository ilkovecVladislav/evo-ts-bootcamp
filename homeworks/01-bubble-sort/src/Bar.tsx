import { FC } from "react";

const CONTAINER_HEIGHT = 400;
const MEDIUM_NUMBER_OF_BARS = 300;

const getScalingFactor = (length: number): number => {
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

const getBarHeight = (value: number, scaling: number): number =>
  ((CONTAINER_HEIGHT * value) / 100) * scaling;

type Props = {
  arraylength: number;
  value: number;
};

const Bar: FC<Props> = ({ arraylength, value }) => {
  const scale = getScalingFactor(arraylength);

  return (
    <div
      className={`${arraylength > MEDIUM_NUMBER_OF_BARS ? "small" : ""} bar`}
      style={{ height: getBarHeight(value, scale) }}
    />
  );
};

export default Bar;
