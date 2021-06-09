import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useBalance } from "./selectors";
import { updateBalance, credit, subtractPercentage, debit } from "./reducer";
import "./App.css";

function App() {
  const balance = useBalance();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (event.target.value && newValue >= 0) {
      setValue(Number(event.target.value));
    }
  };

  const handleSubmitNewBalance = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newBalance = Number(value);
    if (!Number.isNaN(newBalance)) {
      dispatch(updateBalance(newBalance));
      setValue(0);
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

  useEffect(() => {
    dispatch(updateBalance(1000));
    dispatch(credit(200));
    dispatch(debit(50));
    dispatch(subtractPercentage(14));
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Current balance: {balance}</h1>
      <form onSubmit={handleSubmitNewBalance}>
        <h3>Set new balance</h3>
        <input type="number" value={value} onChange={handleChange} />
        <button type="submit" disabled={!value}>
          Set Balance
        </button>
      </form>
      <hr />

      <button onClick={handleCredit}>Credit</button>
      <button onClick={handleDebit}>Debit</button>
      <button onClick={handleTax}>Tax</button>
    </div>
  );
}

export default App;
