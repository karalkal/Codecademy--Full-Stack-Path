const Calculate = {
    sum(arr) {
      if (arr.length === 0) {
        return 0;
      } 
      // if ok
      return arr.reduce((total, current) => total + current);
    }
  }
  
  
  module.exports = Calculate;
  