class Media {
  constructor(title) {
    this._title = title;
    this._isCheckedOut = false;
    this._ratings = [];
  }

  get title() {
    return this._title
  }

  get isCheckedOut() {
    return this._isCheckedOut
  }

  get ratings() {
    return this._ratings
  }

  toggleCheckOutStatus() {
    this._isCheckedOut = !this._isCheckedOut
    return
  }

  getAverageRating() {
    return this.ratings.reduce((a, b) => a + b) / this.ratings.length
  }

  addRating(num) {
    this._ratings.push(num)
  }
}


class Book extends Media {
  constructor(author, title, pages, isCheckedOut, ratings) {
    super(title, isCheckedOut, ratings);
    this._author = author;
    this._pages = pages;
  }

  get author() {
    return self._author
  }

  get pages() {
    return self._pages
  }

  static madeOf() {
    return "paper"
  }
}

class Movie extends Media {
  constructor(director, title, runTime, isCheckedOut, ratings) {
    super(title, isCheckedOut, ratings);
    this._director = director;
    this._runTime = runTime;
  }

  get director() {
    return self._director
  }

  get runTime() {
    return self._runTime
  }
}

const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544)
console.log(historyOfEverything)

historyOfEverything.toggleCheckOutStatus()
console.log(historyOfEverything)

historyOfEverything.toggleCheckOutStatus()
console.log(historyOfEverything)

historyOfEverything.addRating(6.1)
historyOfEverything.addRating(2.2)
historyOfEverything.addRating(4.5)
historyOfEverything.addRating(4.4)
console.log(historyOfEverything.getAverageRating())

// console.log(historyOfEverything.madeOf()) // returns TypeError, as static methods cannot works with instances
console.log(Book.madeOf())










