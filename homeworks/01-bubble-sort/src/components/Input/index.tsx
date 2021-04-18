import { FC, ComponentPropsWithoutRef } from "react";

type Props = {
  label?: string;
} & ComponentPropsWithoutRef<"input">;

const Input: FC<Props> = ({ label, ...rest }) => (
  <label className="input">
    <span className="label">{label}</span>
    <input {...rest} />
  </label>
);

export default Input;
