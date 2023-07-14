/* Redux imported in html file from https://cdnjs.cloudflare.com/ajax/libs/redux/4.2.1/redux.min.js
This gives us access to global object Redux */
// console.log("The Redux object:", Redux)

// Stages - 1. define countReducer, 2. define store - createStore, 3. subscribe to changes, 4. dispatch actions 

const { createStore, combineReducers } = Redux // just to resemble normal syntax instead of Redux.createStore() like after import {createStore} from 'redux'

// REDUCERS
const counterReducer = (state = 0, action) => {
  console.log("Dispathced action to r1:", action)
  switch (action.type) {
    case 'counter/plusOne':
      return state + 1;
    case 'counter/minusOne':
      return state - 1;
    default:
      return state;
  }
}

const stringsReducer = (state = ["gyz"], action) => {
  console.log("Dispathced action to r2:", action)
  switch (action.type) {
    case 'whatever/addToList':
      return [...state, action.payload];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counter: counterReducer,
  strings: stringsReducer
});

// STORE
const store = createStore(rootReducer)
console.log("Current state is:", store.getState())

// SUBSCRIBE changes to store to trigger the callback function
const unsubscribeAlerts = store.subscribe(() =>
  alert(`state changed to ${store.getState()}`)
)

// unsubscribe from alerts only
document.getElementById('stop').addEventListener('click', () => {
  alert('Will unsubscribe from Alerts after pressing OK');
  unsubscribeAlerts();
});

const render = () => {
  // Display current state OF COUNTER
  document.getElementById('count').innerText = store.getState().counter;

  // Render li depending on current state OF STRINGS
  const strings = store.getState().strings;
  const ulElement = document.getElementById('list');
  ulElement.innerHTML = ""    // rebuild it each time
  strings.forEach(element => {
    let newLi = document.createElement("li");
    newLi.innerHTML = element;
    ulElement.appendChild(newLi);
  });

}
render(); // Render once with the initial state

store.subscribe(render); // Re-render on state changes.

// ACTIONS -request a state change
// NB When dispatching action all reducers will receive the action, but only one is supposed to act
//    plus
document.getElementById('incrementer').addEventListener('click', () => {
  store.dispatch({ type: 'counter/plusOne' });
});
//    minus
document.getElementById('decrementer').addEventListener('click', () => {
  store.dispatch({ type: 'counter/minusOne' });
});
//    submit string
document.getElementById('submitBtn').addEventListener('click', () => {
  const userInput = document.getElementById('userInput');
  store.dispatch({
    type: 'whatever/addToList',
    payload: userInput.value
  });
  userInput.value = ""
});
