import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ADD EXPENSE

const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADDEXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({ id = "" } = {}) => ({
  type: "REMOVEEXPENSE",
  id
});

const editExpense = (id, updates) => ({
  type: "EDITEXPENSE",
  id,
  updates
});

const setTextFilter = (text = "") => ({
  type: "SETTEXTFILTER",
  text
});

const sortByDate = date => ({ type: "SORTBYDATE", date });

const setStartDate = startDate => ({ type: "SETSTARTDATE", startDate });

const setEndDate = endDate => ({ type: "SETENDDATE", endDate });

const sortByAmount = amount => ({ type: "SORTBYAMOUNT", amount });

// Expenses reducer

const expensesDefaultState = [];
const expensesReducer = (state = expensesDefaultState, action) => {
  switch (action.type) {
    case "ADDEXPENSE":
      return [...state, action.expense];
    case "REMOVEEXPENSE":
      return state.filter(({ id }) => id != action.id);
    case "EDITEXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return { ...expense, ...action.updates };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// Filter reducer

const filterDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};
const filterReducer = (state = filterDefaultState, action) => {
  switch (action.type) {
    case "SETTEXTFILTER":
      return { ...state, text: action.text };
    case "SORTBYDATE":
      return { ...state, sortBy: "date" };
    case "SORTBYAMOUNT":
      return { ...state, sortBy: "amount" };
    case "SETSTARTDATE":
      return { ...state, startDate: action.startDate };
    case "SETENDDATE":
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

// Get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt >= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
      if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "RENT", amount: 100 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "SALE", amount: 300 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate());

const demoState = {
  expenses: [
    {
      id: "jjhjh",
      description: "January Expenses",
      note: "This was the final payment for that address",
      amount: 545000,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
};

const user = {
  name: "Jen",
  age: 24
};

// console.log({ ...user, location: "Philo" });
