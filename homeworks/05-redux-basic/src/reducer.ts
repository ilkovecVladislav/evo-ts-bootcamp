const UPDATE_BALANCE = "UPDATE_BALANCE";
const CREDIT = "CREDIT";
const SUBTRACT_PERCENTAGE = "SUBTRACT_PERCENTAGE";
const DEBIT = "DEBIT";

type State = {
  balance: number;
};

const initialState = {
  balance: 0,
};

type UpdateBalance = {
  type: typeof UPDATE_BALANCE;
  payload: number;
};

type Credit = {
  type: typeof CREDIT;
  payload: number;
};

type SubtractPercentage = {
  type: typeof SUBTRACT_PERCENTAGE;
  payload: number;
};

type Debit = {
  type: typeof DEBIT;
  payload: number;
};

type Action = UpdateBalance | Credit | SubtractPercentage | Debit;

const updateBalance = (value: number): UpdateBalance => ({
  type: UPDATE_BALANCE,
  payload: value,
});

const credit = (value: number): Credit => ({
  type: CREDIT,
  payload: value,
});

const subtractPercentage = (value: number): SubtractPercentage => ({
  type: SUBTRACT_PERCENTAGE,
  payload: value,
});

const debit = (value: number): Debit => ({
  type: DEBIT,
  payload: value,
});

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case UPDATE_BALANCE: {
      return { ...state, balance: action.payload };
    }
    case CREDIT: {
      return { ...state, balance: state.balance - action.payload };
    }
    case DEBIT: {
      return { ...state, balance: state.balance + action.payload };
    }
    case SUBTRACT_PERCENTAGE: {
      const currentBalance = state.balance;
      const result = currentBalance * (1 - action.payload / 100);

      return { ...state, balance: result };
    }

    default:
      return state;
  }
};

export default reducer;

export { updateBalance, credit, subtractPercentage, debit };
