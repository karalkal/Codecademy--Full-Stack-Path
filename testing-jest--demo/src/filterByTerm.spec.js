// describe - Jest method for containing one or more related tests. 
// It takes two arguments: a string for describing the test suite, and a callback function for wrapping the actual test.
// Every time you start writing a new suite of tests for a functionality wrap it in a describe block. 

const {filterByTerm, MyCustomError} = require("../filterByTerm");


describe("Filter function", () => {

    // the actual test block
    test("it should filter by a search term 'KUR' or '88", () => {

        // ARRANGE
        const input = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
            { id: 3, url: "https://www.888-KUR-8.dev" }
        ];
        const output = [{ id: 3, url: "https://www.888-KUR-8.dev" }];

        // ACT
        // ASSERT
        expect(filterByTerm(input, "KUR")).toEqual(output);
        expect(filterByTerm(input, "88")).toEqual(output);
    });

    test("it should filter by a search term and be case-insensitive", () => {
        const input = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
            { id: 3, url: "https://www.UPPERCASE.dev" }
        ];
        const output = [{ id: 3, url: "https://www.UPPERCASE.dev" }];

        expect(filterByTerm(input, "casE")).toEqual(output);
        expect(filterByTerm(input, "pper")).toEqual(output);
    });

    test("it should throw error if search term is empty str", () => {

        const input = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
            { id: 3, url: "https://www.UPPERCASE.dev" }
        ];

        expect(() => filterByTerm(input, "")).toThrow(MyCustomError);
        expect(() => filterByTerm(input, "      ")).toThrow(MyCustomError);
    });

    test("if error thrown message should be 'Ain\'t happening'", () => {
        const input = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
            { id: 3, url: "https://www.UPPERCASE.dev" }
        ];

        let thrownError;
        try {
            filterByTerm(input, "");
        }
        catch (error) {
            thrownError = error;
        }

        expect(thrownError.message).toEqual("Ain't happening");
    });
});