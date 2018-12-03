class PlayingCard {
  constructor(rank, suit) {
    this._rank = rank
    this._suit = suit
  }

  rank() {
    return this._rank
  }

  suit() {
    return this._suit
  }

  toString() {
    return `${this.rank()} of ${this.suit()}`
  }
}

export default PlayingCard;
