function printOnceWithDelay() {
    setTimeout(
        () => console.log("... and after 4 seconds the callback function will be called asynchronously"),
        4000);
    console.log('Doing important stuff...');
    console.log('...Still doing important stuff.');
}


function printEightTimesAfter4Seconds() {
    // asign setInterval to var, so it can be stopped with clearInterval
    let nIntervId = setInterval(
        () => {
            for (let pesho = 1; pesho <= 8; pesho++) {
                console.log("Function called asynchronously", pesho);
            }
            console.log("Without clearInterval(nIntervId) the loop will get restarted indefinitelly (not the same as indefinite loop.)")
            clearInterval(nIntervId)
        },
        4000);

    console.log('Doing important stuff...');
    console.log('...Still doing important stuff.');
}




/* Uncomment for demo */
// console.log("=== setTimeout ===")
// printOnceWithDelay()


console.log("=== setInterval ===")
printEightTimesAfter4Seconds()
