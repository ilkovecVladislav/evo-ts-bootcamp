import { useSelector } from "react-redux";

import { RootState } from "./store";

export const useBalance = () =>
  useSelector((state: RootState) => state.balance);
