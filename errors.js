function typeErr() {
    const someVar = 'Cannot be reassigned';
    try {
        someVar = 'Still going to try';
    } catch (e) {
        console.log("ErrName: ", e.name, "/ Message:", e.message);
    }
}

function refErr() {
    try {
        return undefVar
    }
    catch (e) {
        console.log("ErrName: ", e.name, "/ Message:", e.message);
    }
}

function zeroDiv() {
    try {
        console.log("Division by zero is ok in JS! Result is: ", 2 / 0)
    } catch (e) {
        console.log("just wow!");
    }
}


typeErr();
refErr();
zeroDiv();

