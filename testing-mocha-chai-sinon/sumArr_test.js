const assert = require('assert');
const Calculate = require('./sumArr.js')

describe('Calculate', () => {
    describe('.sum', () => {
        it('returns the sum of an array of numbers', () => {
            // Setup
            let expected = 0;
            [1, 2, 3, 100, 1].forEach(num => {
                expected += num;
            })
            // Exercise
            const actual = (Calculate.sum([1, 2, 3, 100, 1]))
            // Verification
            assert.strictEqual(expected, actual);
        });

        it('returns zero for an empty array', () => {
            let expected = 0;
            const actual = (Calculate.sum([]))
            assert.strictEqual(expected, actual);
        });

        it('returns correctly concatenated string', () => {
            let expected = "ABCD";
            const actual = (Calculate.sum(["A", "B", "C", "D"]))
            assert.strictEqual(expected, actual);
        })
    });
});
