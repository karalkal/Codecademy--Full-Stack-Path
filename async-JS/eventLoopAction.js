console.log("FIRST");

function usingsetTimeout() {
    console.log("I'm going to be queued in the Event Loop.");
}
setTimeout(usingsetTimeout, 3000);

console.log("LAST");
/*
   1 console.log("FIRST"); is added to the stack, executes, then pops off of the stack.
   2 setTimeout() is added to the stack.
   3 setTimeout()’s callback is passed to be executed by a web API. The timer will run for 3 seconds. 
After 3 seconds elapse, the callback function, usingsetTimeout() is pushed to the Event Queue. [but before this happens...]
   4 The Event Loop, meanwhile, will check periodically if the stack is cleared to handle any messages in the Event Queue.
   5 console.log("LAST"); is added to the stack, executes, then pops off of the stack.
   6 The stack is now empty, so the event loop pushes usingsetTimeout onto the stack. [... since 3 seconds have elapsed]
   7 console.log("I'm going to be queued in the Event Loop."); is added to the stack, executes, gets popped
   8 usingsetTimeout pops off of the stack.
*/
