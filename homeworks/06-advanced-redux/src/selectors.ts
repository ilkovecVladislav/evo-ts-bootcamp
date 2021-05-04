import { Pizza, EnhPizza } from "./types";
import { useSelector } from "react-redux";

import { RootState } from "./store";

export const usePizzaList = () =>
  useSelector((state: RootState): Pizza[] => state.pizzaList.pizzaList);

export const useBucket = () =>
  useSelector((state: RootState): EnhPizza[] => state.bucket.bucket);
