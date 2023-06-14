// npm install sinon
// npm install @sinonjs/referee-sinon --save-dev

const { assert, expect } = require("@sinonjs/referee-sinon");
const sinon = require("sinon");

const robot = require("./sayHiBye")


describe('greet should return hello XYZ', () => {
  it("this is only a test test :-)", () => {
    let spy = sinon.spy(robot, 'greet'); // Initialize the spy
    robot.greet('XYZ'); // Call the method
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, 'XYZ');
    assert(spy.returned('Hello XYZ'));
    robot.greet.restore(); // Remove spy from wrapped method
  });
});

describe('bye should return Bye-Bye, Bay Huy', () => {
  it("an attempt to use the correct syntax", () => {
    let spy = sinon.spy(robot, 'bye');
    robot.bye("Bay Huy");

    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, "Bay Huy");

    robot.bye.restore()
  });
});
