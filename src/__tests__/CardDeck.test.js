import CardDeck from '../CardDeck'

describe('CardDeck', () => {
  let deck

  beforeEach(() => {
    deck = new CardDeck()
  })

  describe('#constructor', () => {
    it('begins with a deck of 52 standard playing cards', () => {
      expect(deck.count()).toEqual(52)
    })
  })

  describe('#shuffle', () => {
    it('shuffles the cards', () => {
      const deck2 = new CardDeck()
      expect(deck.cards()).toEqual(deck2.cards())

      deck2.shuffle()
      expect(deck.cards()).not.toEqual(deck2.cards())
    })
  })

  describe('#deal', () => {
    it('returns the first card', () => {
      const card = deck.deal()

      expect(card.rank()).toEqual('A')
      expect(card.suit()).toEqual('S')
      expect(deck.count()).toEqual(51)
    })
  })

  describe('#count', () => {
    it('returns the number of cards in the deck', () => {
      expect(deck.count()).toBe(52)
    })
  })

  describe('#isEmpty', () => {
    it('returns false if the deck has cards', () => {
      expect(deck.isEmpty()).toBe(false)
    })

    it('returns true if the deck has no cards', () => {
      [...Array(52).keys()].forEach(() => deck.deal())
      expect(deck.isEmpty()).toBe(true)
    })
  })
})
