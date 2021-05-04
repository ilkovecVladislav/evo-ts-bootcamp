import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { logger } from "./utils";
import { reducer as pizzaListReducer } from "./reducers/pizzaList";
import { reducer as bucketReducer } from "./reducers/pizzaBucket";

const rootReducer = combineReducers({
  pizzaList: pizzaListReducer,
  bucket: bucketReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
