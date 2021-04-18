import { FC, ComponentPropsWithoutRef } from "react";

type Props = {
  type?: "button" | "reset" | "submit";
  text: string;
} & ComponentPropsWithoutRef<"button">;

const Button: FC<Props> = ({ text, type = "button", ...rest }) => (
  <button className="button" type={type} {...rest}>
    {text}
  </button>
);

export default Button;
