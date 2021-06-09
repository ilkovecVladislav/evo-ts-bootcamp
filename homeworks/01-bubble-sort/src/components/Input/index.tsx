import { FC, ComponentPropsWithoutRef } from "react";
import style from "./styles.module.css";

type Props = {
  label?: string;
} & ComponentPropsWithoutRef<"input">;

const Input: FC<Props> = ({ label, ...rest }) => (
  <label className={style.input}>
    <span className={style.label}>{label}</span>
    <input {...rest} />
  </label>
);

export default Input;
