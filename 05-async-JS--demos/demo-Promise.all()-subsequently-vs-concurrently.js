
/* === Promise.all() ===
    Promise.all() allows us to take advantage of asynchronicity— each of the four asynchronous tasks can process concurrently. 
    Promise.all() also has the benefit of failing fast,
    meaning it won’t wait for the rest of the asynchronous actions to complete once any one has rejected. 

    Please note although we invoke subsequently first, concurrently finishes first
 */
let prom = () => {
    return new Promise((resolve, reject) => {
        let arr = []
        for (let index = 0; index < 111222; index++) {
            arr.push(index)
        };

        resolve(arr);
    })
};

let prom2 = () => {
    return new Promise((resolve, reject) => {
        let arr = []
        for (let index = 0; index < 111222; index++) {
            arr.push(index)
        };

        resolve(arr);
    });
};

let prom3 = () => {
    return new Promise((resolve, reject) => {
        let arr = []
        for (let index = 0; index < 111222; index++) {
            arr.push(index)
        };

        resolve(arr);
    });
};

let prom4 = () => {
    return new Promise((resolve, reject) => {
        let arr = []
        for (let index = 0; index < 111222; index++) {
            arr.push(index)
        };

        resolve(arr);
    });
};

async function subsequently() {
    let startTime = performance.now()
    await prom()
    await prom2()
    await prom3()
    await prom4()
    let finishTime = performance.now()
    console.log("subsequently took", finishTime - startTime)
}

async function concurrently() {
    let startTime = performance.now()
    await Promise.all([prom(), prom2(), prom3(), prom4()])
    let finishTime = performance.now()
    console.log("concurrently took", finishTime - startTime)

}

subsequently()
concurrently()
