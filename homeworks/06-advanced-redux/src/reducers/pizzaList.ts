import { Dispatch } from "redux";

import { getPizza } from "../services/api";
import { Pizza } from "../types";

const SET_PIZZA_LIST = "PIZZA_VIEWED";

type PizzaListState = {
  pizzaList: Pizza[];
};

const initialState = {
  pizzaList: [],
};

type SetPizza = {
  type: typeof SET_PIZZA_LIST;
  payload: Pizza[];
};

type Action = SetPizza;

const setPizza = (data: Pizza[]) => ({
  type: SET_PIZZA_LIST,
  payload: data,
});

export const loadPizzaList = () => (dispatch: Dispatch) =>
  getPizza().then((response) => {
    dispatch(setPizza(response.items));
  });

export const reducer = (
  state: PizzaListState = initialState,
  action: Action
): PizzaListState => {
  if (action.type === SET_PIZZA_LIST) {
    return { ...state, pizzaList: action.payload };
  }

  return state;
};
