import { EnhPizza } from "../types";
import { PizzaBasketItem } from "./PizzaBasketItem";

interface PizzaBucketProps {
  data: EnhPizza[];
  onMinus: (_id: string) => void;
}

export const PizzaBasket = ({ data, onMinus }: PizzaBucketProps) => (
  <>
    {data.map((pizza) => (
      <PizzaBasketItem
        _id={pizza._id}
        key={pizza._id}
        price={Number((pizza.price * pizza.count).toFixed(2))}
        name={pizza.name}
        count={pizza.count}
        onMinus={onMinus}
      />
    ))}
  </>
);
