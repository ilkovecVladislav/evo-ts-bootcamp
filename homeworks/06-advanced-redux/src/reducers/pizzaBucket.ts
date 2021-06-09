import { RootState } from "./../store";
import { Dispatch } from "redux";

import { Pizza, EnhPizza } from "../types";

const PIZZA_ADDED_INTO_BASKET = "PIZZA_ADDED_INTO_BASKET";
const PIZZA_REMOVED_FROM_BASKET = "PIZZA_REMOVED_FROM_BASKET";

type BucketListState = {
  bucket: EnhPizza[];
};

const initialState = {
  bucket: [],
};

type SetPizza = {
  type: typeof PIZZA_ADDED_INTO_BASKET;
  payload: Pizza;
};

type RemovePizza = {
  type: typeof PIZZA_REMOVED_FROM_BASKET;
  payload: string;
};

type Action = SetPizza | RemovePizza;

const setPizza = (data: Pizza) => ({
  type: PIZZA_ADDED_INTO_BASKET,
  payload: data,
});

export const selectPizza = (id: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const pizza = getState().pizzaList.pizzaList.find((item) => item._id === id);
  if (pizza) {
    dispatch(setPizza(pizza));
  }
};

export const removePizza = (id: string) => ({
  type: PIZZA_REMOVED_FROM_BASKET,
  payload: id,
});

export const reducer = (
  state: BucketListState = initialState,
  action: Action
): BucketListState => {
  switch (action.type) {
    case PIZZA_ADDED_INTO_BASKET: {
      const { bucket } = state;
      if (bucket.length === 0) {
        return { ...state, bucket: [{ ...action.payload, count: 1 }] };
      }

      const target = bucket.find((item) => item._id === action.payload._id);

      if (target) {
        const newBucket = bucket.map((pizza) => {
          if (pizza._id === action.payload._id) {
            return { ...pizza, count: pizza.count + 1 };
          }

          return pizza;
        });

        return { ...state, bucket: newBucket };
      }

      return { ...state, bucket: [...bucket, { ...action.payload, count: 1 }] };
    }
    case PIZZA_REMOVED_FROM_BASKET: {
      const { bucket } = state;
      const newBucket = bucket
        .map((pizza) => {
          if (pizza._id === action.payload) {
            return { ...pizza, count: pizza.count - 1 };
          }

          return pizza;
        })
        .filter((pizza) => pizza.count > 0);

      return { ...state, bucket: newBucket };
    }

    default:
      return state;
  }
};
