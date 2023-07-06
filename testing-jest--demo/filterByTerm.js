class MyCustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "MyCustomError";
        this.message = "Ain't happening";
    }
}

// i -->> Perform case-insensitive matching
function filterByTerm(inputArr, searchTerm) {
    if (searchTerm.trim() === "") {
        throw new MyCustomError()

    }
    const regex = new RegExp(searchTerm, "i");
    return inputArr.filter(function (arrayElement) {
        return arrayElement.url.match(regex);
    });
}

module.exports = {filterByTerm, MyCustomError};