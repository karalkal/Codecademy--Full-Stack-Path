const robot = {
    greet(name){  // Unit being tested
      return 'Hello ' + name;
    },
    bye(name) {
      return ("Bye Bye,", name)
    },
  };

  
  module.exports = robot;
