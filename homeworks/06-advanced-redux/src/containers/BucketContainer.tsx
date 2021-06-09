import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { Missing, PizzaBasket, TotalPrice } from "../components";
import { removePizza } from "../reducers/pizzaBucket";
import { useBucket } from "../selectors";

const BucketContainer = () => {
  const dispatch = useDispatch();

  const bucket = useBucket();

  const handleMinusPizza = useCallback(
    (_id: string) => {
      dispatch(removePizza(_id));
    },
    [dispatch]
  );

  const total = Number(
    bucket
      .map((pizza) => pizza.count * pizza.price)
      .reduce((totalSum, current) => totalSum + current, 0)
      .toFixed(2)
  );

  return (
    <div className="col-span-1 bg-white overflow-y-auto h-full">
      <div className="flex flex-col p-8">
        <TotalPrice price={total} />
        {bucket.length ? (
          <PizzaBasket data={bucket} onMinus={handleMinusPizza} />
        ) : (
          <Missing />
        )}
        <div className="flex flex-col">
          <button className="bg-yellow-400 rounded-xl pt-2 pb-2">
            Make Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BucketContainer;
