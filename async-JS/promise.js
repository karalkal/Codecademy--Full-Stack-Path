/*
    resolve is a function with one argument. Under the hood, if invoked, 
    resolve() will change the promise’s status from pending to fulfilled, 
    and the promise’s resolved value will be set to the argument passed into resolve().
    
    reject is a function that takes a reason or error as an argument. 
    Under the hood, if invoked, reject() will change the promise’s status from pending 
    to rejected, and the promise’s rejection reason will be set to the argument passed into reject().

    The initial state of an asynchronous promise is pending, but we have a guarantee that it will settle. 
    How do we tell the computer what should happen then? Promise objects come with an aptly named .then() method. 
    It allows us to say, “I have a promise, when it settles, then here’s what I want to happen…”
    .then() is a higher-order function— it takes two callback functions as arguments. 
    We refer to these callbacks as handlers. When the promise settles, the appropriate handler will be invoked with that settled value.
        The first handler, sometimes called onFulfilled, is a success handler, and it should contain the logic for the promise resolving.
        The second handler, sometimes called onRejected, is a failure handler, and it should contain the logic for the promise rejecting.
    We can invoke .then() with one, both, or neither handler! This allows for flexibility, but it can also make for tricky debugging. 
    If the appropriate handler is not provided, instead of throwing an error, .then() will just return a promise with the same settled value 
    as the promise it was called on. One important feature of .then() is that it always returns a promise. 
*/
let prom = new Promise((resolve, reject) => {
    let num = Math.floor(Math.random() * 10);
    if (num % 2 === 0) {
        resolve(`EVEN - resolved with ${num}`);
    } else {
        reject(`OOD - rejected with ${num}`);
    }
});


// PROMISE SETTLES, the appropriate handler will be invoked
// The eventual state of a pending promise can either be fulfilled with a value or rejected with a reason (error)

// const handleSuccess = (resolvedValue) => { console.log(resolvedValue); };
// const handleFailure = (rejectionReason) => { console.log(rejectionReason); };
// prom.then(handleSuccess).catch(handleFailure)

// OR ()

prom.then((resolvedValue) => {
    console.log(resolvedValue);
})
    .catch((rejectionReason) => {
        console.log(rejectionReason);
    });

/*
    prom is a promise which either resolves with 'Even' or rejects with 'Odd' depending on a random number (0-9).
    We pass a success handler to .then() and a failure handler to .catch().
    If the promise resolves, .then()‘s success handler will be invoked.
    If the promise rejects, .then() will return a promise with the same rejection reason as the original promise 
    and .catch()‘s failure handler will be invoked with that rejection reason.
*/