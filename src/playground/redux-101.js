import { createStore } from "redux";

// Action generators - functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy: typeof incrementBy === "number" ? incrementBy : 1
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy: typeof decrementBy === "number" ? decrementBy : 1
});

const resetCount = () => ({
  type: "RESET"
});

const setCount = ({ count } = {}) => ({
  type: "SET",
  count
});

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.incrementBy };
    case "DECREMENT":
      return { count: state.count - action.decrementBy };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
});

store.subscribe(() => {
  console.log(store.getState());
});

for (let i = 0; i < 10; i++) {
  store.dispatch(incrementCount());
}

store.dispatch(incrementCount({ incrementBy: 5 }));
