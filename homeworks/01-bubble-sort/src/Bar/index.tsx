import { FC } from "react";
import { getScalingFactor, getBarHeight } from "./utils";
import style from "./styles.module.css";

const MEDIUM_NUMBER_OF_BARS = 300;

type Props = {
  arraylength: number;
  value: number;
};

const Bar: FC<Props> = ({ arraylength, value }) => {
  const scale = getScalingFactor(arraylength);

  return (
    <div
      className={`${arraylength > MEDIUM_NUMBER_OF_BARS ? style.small : ""} ${
        style.bar
      }`}
      style={{ height: getBarHeight(value, scale) }}
    />
  );
};

export default Bar;
