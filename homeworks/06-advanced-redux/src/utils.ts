import { Middleware } from "redux";

import { RootState } from "./store";
import { logInfo } from "./services/api";

type LogData = {
  eventName: string;
  pizzaName?: string;
  pizzaPrice?: number;
};

export const logger: Middleware<{}, RootState> = (store) => (next) => (
  action
) => {
  if (action.type) {
    const result: LogData = {
      eventName: action.type,
    };
    if (typeof action.payload === "string") {
      const pizza = store
        .getState()
        .pizzaList.pizzaList.find((item) => item._id === action.payload);
      if (pizza) {
        console.log(4);
        result.pizzaName = pizza.name;
        result.pizzaPrice = pizza.price;
      }
    } else if (!Array.isArray(action.payload)) {
      result.pizzaName = action.payload.name;
      result.pizzaPrice = action.payload.price;
    }
    console.log(result);
    logInfo(result);
  }

  return next(action);
};
