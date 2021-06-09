import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Loading, PizzaList } from "../components";
import { loadPizzaList } from "../reducers/pizzaList";
import { selectPizza } from "../reducers/pizzaBucket";
import { usePizzaList } from "../selectors";

const PizzaListContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPizzaList());
  }, [dispatch]);

  const pizzaList = usePizzaList();

  const handleAddPizza = useCallback(
    (_id: string) => {
      dispatch(selectPizza(_id));
    },
    [dispatch]
  );

  return (
    <div className="col-span-2 p-8">
      <div className="grid grid-cols-4 gap-4">
        {pizzaList.length ? (
          <PizzaList data={pizzaList} onAdd={handleAddPizza} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default PizzaListContainer;
