class RoundResult {
  constructor(asker, cards, target) {
    this._asker = asker
    this._cards = cards
    this._target = target
  }

  asker() {
    return this._asker
  }

  target() {
    if (!this._target) this._target = 'deck'
    return this._target
  }

  cards() {
    return this._cards
  }

  toString() {
    return `${this._askerToString()} ${this.target() == 'deck' ? 'drew' : 'took'} ${this._cardsToString()} from ${this.target() == 'deck' ? 'the deck' : this._targetToString()}`
  }

  _askerToString() {
    return this.asker().isHumanPlayer() ? 'You' : this.asker().name()
  }

  _targetToString() {
    return this.target().isHumanPlayer() ? 'you' : this.target().name()
  }

  _cardsToString() {
    return !this.asker().isHumanPlayer() && this.target() == 'deck' ? 'cards' : this.cards().join(', ')
  }
}

export default RoundResult
