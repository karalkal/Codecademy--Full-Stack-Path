/*
This function returns a promise that uses a series of setTimeout() functions 
to simulate a time-consuming asynchronous action. It's a good example of "callback hell" or "the pyramid of doom," 
two ways people describe how confusing a bunch of nested callback functions can become.
*/

const brainstormDinner = (methodUsed) => {
    return new Promise((resolve, reject) => {
        console.log(`${methodUsed}I have to decide what's for dinner...`)
        setTimeout(() => {
            console.log(`${methodUsed}1...`);
            setTimeout(() => {
                console.log(`${methodUsed}2...`);
                setTimeout(() => {
                    console.log(`${methodUsed}3...`);
                    setTimeout(() => {
                        console.log(`${methodUsed}4...`);
                        //resolves after this, hence after 4 prints 5 in nativePromiseDinner, the other prints run simultaneously
                        resolve('5!!!');
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    });
};


// Native promise version:
function nativePromiseDinner() {
    brainstormDinner("using .then - ").then((result) => {
        console.log(`(.then) and finally - ${result}.`);
    });
}

// async/await version:
async function announceDinner() {
    // Write your code below:
    let result = await brainstormDinner("async-await - ");
    console.log(`(async-await) and finally - ${result}.`);
}

nativePromiseDinner()
announceDinner()

