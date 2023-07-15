console.log = function () { };
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('../public/main.js', 'utf8');

describe('', function () {
    it('', function () {
        let structureOne = function () {
            const getSuggestions = () => {
                _.then(response => {
                    if (response.ok) { }
                })
            }
        };

        let structureTwo = function () {
            const getSuggestions = () => {
                _.then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                })
            }
        }

        let isMatchOne, isMatchTwo;
        try {
            isMatchOne = Structured.match(code, structureOne);
            isMatchTwo = Structured.match(code, structureTwo);
        } catch (e) {
            assert.isOk(false, 'Looks like you have an error. Double check your syntax.');
        }

        assert.isOk(isMatchOne, 'Did you check the truthiness of  `response.ok` in a conditional statement?');
        assert.isOk(isMatchTwo, 'Did you return `response.json()` inside the conditional statement?');
    });
});
