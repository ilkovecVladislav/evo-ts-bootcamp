import { FC, ComponentPropsWithoutRef } from "react";
import style from "./styles.module.css";

type Props = {
  text: string;
} & ComponentPropsWithoutRef<"button">;

const Button: FC<Props> = ({ text, type = "button", ...rest }) => (
  <button className={style.button} type={type} {...rest}>
    {text}
  </button>
);

export default Button;
