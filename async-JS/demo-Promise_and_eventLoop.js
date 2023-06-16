/*
When the function getBeans() is called, getBeans() is added to the stack. 
The first console.log() statement is added to the stack, executes, and is popped off the stack. 

Next, the async function shopForBeans() is called and the return value [WHICH IS PROMISE()] is assigned to the variable value.
The response will be handled by the event queue and event loop and pushed back into the stack WHEN IT IS CLEARED. 
The final log statement will then be added to the stack, log the argument, and pop off the stack.

The stack will be clear afterward, so the response event in the event queue will get added back to the stack and executed. 
The final two console.log() statements will then be added to the stack and popped off after logging their arguments.

In second example (without timeOut) step 2 console.log is executed before Promise gets resolved
because it does't depend on the outcome but step 3 console.log still awaits and the extra line is printed before it.
*/

const shopForBeans = () => {
    return new Promise((resolve, reject) => {
        const beanTypes = ['kidney', 'fava', 'pinto', 'black', 'garbanzo'];
        setTimeout(() => {
            let randomIndex = Math.floor(Math.random() * beanTypes.length);
            let beanType = beanTypes[randomIndex];
            console.log(`2. I bought ${beanType} beans because they were on sale.`);
            resolve(beanType);
        }, 1000);
    });
}

async function getBeans() {
    console.log(`1. Heading to the store to buy beans...`);
    let value = await shopForBeans();
    console.log(`3. Great! I'm making ${value} beans for dinner tonight!`);
}

// getBeans();
// console.log("This is printed prior to the Promise being resolved.");


const shopForBeans2 = () => {
    return new Promise((resolve, reject) => {
        const beanTypes = ['kidney', 'fava', 'pinto', 'black', 'garbanzo'];
        let randomIndex = Math.floor(Math.random() * beanTypes.length);
        let beanType = beanTypes[randomIndex];
        resolve(beanType);
        console.log(`2. I bought ${beanType} beans because they were on sale.`);
    });
}

async function getBeans2() {
    console.log(`1. Heading to the store to buy beans...`);
    let value = await shopForBeans2();
    console.log(`3. Great! I'm making ${value} beans for dinner tonight!`);
}

getBeans2();
console.log("This is printed prior to the Promise being resolved.");