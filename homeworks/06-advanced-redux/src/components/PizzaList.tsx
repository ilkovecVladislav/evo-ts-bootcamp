import { PizzaItem } from "./PizzaItem";

interface PizzaListProps {
  data: {
    _id: string;
    name: string;
    price: number;
  }[];
  onAdd: (_id: string) => void;
}

export const PizzaList = ({ data, onAdd }: PizzaListProps) => (
  <>
    {data.map((pizza) => (
      <PizzaItem
        key={pizza._id}
        _id={pizza._id}
        name={pizza.name}
        price={pizza.price}
        onAdd={onAdd}
      />
    ))}
  </>
);
