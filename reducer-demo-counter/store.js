// Redux imported in html file from https://cdnjs.cloudflare.com/ajax/libs/redux/4.2.1/redux.min.js
// This gives us access to global object Redux
console.log("The Redux object:", Redux)

// stages - 1. define countReducer, 2. define store - createStore, 3. subscribe to changes, 4. dispatch actions 

const { createStore } = Redux // just to resemble normal syntax instead of Redux.createStore() like after import {createStore} from 'redux'

const countReducer = (state = 0, action) => {
  console.log("Dispathced action:", action)
  switch (action.type) {
    case 'plusOne':
      return state + 1;
    case 'minusOne':
      return state - 1;
    default:
      return state;
  }
}
const store = createStore(countReducer);
console.log("The store:", store)

// Subscribe changes to store to trigger the callback function
const unsubscribeAlerts = store.subscribe(() =>
  alert(`state changed to ${store.getState()}`)
)

const render = () => {
  document.getElementById('count').innerText = store.getState(); // Display the current state.
}
render(); // Render once with the initial state of 0.

store.subscribe(render); // Re-render on state changes.

// plus
document.getElementById('incrementer').addEventListener('click', () => {
  store.dispatch({ type: 'plusOne' }); // Request a state change.
});
// minus
document.getElementById('decrementer').addEventListener('click', () => {
  store.dispatch({ type: 'minusOne' }); // Request a state change.
});
// unsubscribe from alerts only
document.getElementById('stop').addEventListener('click', () => {
  alert ('will unsubscribe after pressing ok');
  unsubscribeAlerts()});