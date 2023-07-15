# input - expected output - assert the result

  
## Arrange inputs and targets. 
Arrange steps should set up the test case. Does the test require any objects or special settings? Does it need to prep a database? Does it need to log into a web app? Handle all of these operations at the start of the test.
## Act on the target behavior. 
Act steps should cover the main thing to be tested. This could be calling a function or method, calling a REST API, or interacting with a web page. Keep actions focused on the target behavior.
## Assert expected outcomes. 
Act steps should elicit some sort of response. Assert steps verify the goodness or badness of that response. Sometimes, assertions are as simple as checking numeric or string values. Other times, they may require checking multiple facets of a system. Assertions will ultimately determine if the test passes or fails.

### initilaize:  
`npm init -y`

### install Jest:  
`npm i jest --save-dev`

### configure script named test for running Jest:
```
  "scripts": {
    "test": "jest"
  },
```
### Jest expects to find test files in a folder __tests__:  
`mkdir __tests__`

###**coverage** can be activated in two ways:

- via the command line by passing the flag --coverage: `npm test -- --coverage`

- by configuring Jest in package.json:
```
  "scripts": {
    "test": "jest --coverage"
  },
```
OR 
```
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "collectCoverage": true,
    "coverageReporters": ["html"]
  },
```
Inside /coverage/index.html is a complete HTML summary of the coverage for the code.
