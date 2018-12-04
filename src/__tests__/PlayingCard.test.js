import PlayingCard from '../PlayingCard'

describe('PlayingCard', () => {
  let rank, suit, card

  beforeEach(() => {
    rank = 'A'
    suit = 'S'
    card = new PlayingCard(rank, suit)
  })

  describe('#constructor', () => {
    it('has a rank and suit', () => {
      expect(card.rank()).toEqual(rank)
      expect(card.suit()).toEqual(suit)
    })
  })

  describe('#toString', () => {
    it('returns the card in string form', () => {
      expect(card.toString()).toEqual(`${rank} of ${suit}`)
    })
  })
})
