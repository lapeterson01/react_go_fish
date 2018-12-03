class Player {
  static asHuman(name) {
    return new this(name, true)
  }

  constructor(name, isHumanPlayer) {
    this._name = name
    this._hand = {}
    this._humanPlayer = isHumanPlayer || false
  }

  isHumanPlayer() {
    return this._humanPlayer
  }

  name() {
    return this._name
  }

  handObject() {
    return this._hand
  }

  hand() {
    return Object.values(this.handObject()).flat()
  }

  countHand() {
    return this.hand().length
  }

  isHandEmpty() {
    return this.countHand() === 0
  }

  addBook() {
    if (!this._books) this._books = 0
    this._books += 1
  }

  books() {
    if (!this._books) this._books = 0
    return this._books
  }

  calculateBooks() {
    for (let rank in this.handObject()) {
      if (this.handObject()[rank].length === 4) {
        delete this.handObject()[rank]
        this.addBook()
      }
    }
  }

  retrieveCard(card) {
    if (this.hasRank(card.rank())) {
      this._hand[card.rank()].push(card)
    } else {
      this._hand[card.rank()] = [card]
    }
    return card
  }

  giveUpCards(rank) {
    if (this.hasRank(rank)) {
      const cardsToReturn = this.handObject()[rank]
      delete this.handObject()[rank]
      return cardsToReturn
    }
  }

  hasRank(rank) {
    return this.handObject().hasOwnProperty(rank)
  }
}

export default Player;
