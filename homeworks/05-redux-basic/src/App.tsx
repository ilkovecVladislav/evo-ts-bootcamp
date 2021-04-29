import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { useBalance } from "./selectors";
import { updateBalance, credit, subtractPercentage, debit } from "./reducer";
import "./App.css";

function App() {
  const balance = useBalance();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmitNewBalance = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newBalance = Number(value);
    if (!Number.isNaN(newBalance)) {
      dispatch(updateBalance(newBalance));
      setValue("");
    }
  };

  const handleCredit = () => {
    dispatch(credit(200));
  };

  const handleDebit = () => {
    dispatch(debit(50));
  };

  const handleTax = () => {
    dispatch(subtractPercentage(14));
  };

  return (
    <div className="App">
      <h1>Current balance: {balance}</h1>
      <form onSubmit={handleSubmitNewBalance}>
        <h3>Set new balance</h3>
        <input type="number" value={value} onChange={handleChange} />
        <button type="submit">Set Balance</button>
      </form>
      <hr />

      <button onClick={handleCredit}>Credit</button>
      <button onClick={handleDebit}>Debit</button>
      <button onClick={handleTax}>Tax</button>
    </div>
  );
}

export default App;
