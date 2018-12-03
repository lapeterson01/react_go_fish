import PlayingCard from './PlayingCard'

class CardDeck {
  constructor() {
    this._cards = this._createDeck()
  }

  static ranks() { return ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'] }
  static suits() { return ['S', 'C', 'D', 'H'] }

  cards() {
    return this._cards
  }

  shuffle() {
    const cards = this._cards;

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    this._cards = cards;
  }

  deal() {
    return this.cards().shift()
  }

  count() {
    return this.cards().length
  }

  isEmpty() {
    return this.count() === 0
  }

  _createDeck() {
    return CardDeck.ranks().flatMap((rank) => {
      return CardDeck.suits().map(suit => new PlayingCard(rank, suit))
    })
  }
}

export default CardDeck;
