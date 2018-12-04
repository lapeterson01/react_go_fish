import Player from '../Player'
import PlayingCard from '../PlayingCard'

describe('Player', () => {
let player, card

beforeEach(() => {
  player = new Player('Player 1')
  card = new PlayingCard('A', 'S')
})

describe('#asHuman', () => {
  it('creates a new player as a human', () => {
    const humanPlayer = Player.asHuman('Human Player')
    expect(humanPlayer.isHumanPlayer()).toBe(true)
  })
})

describe('#isHumanPlayer', () => {
  it('returns true if player is a human player', () => {
    const humanPlayer = Player.asHuman('Human Player')
    expect(humanPlayer.isHumanPlayer()).toBe(true)
  })

  it('returns false if player is not a human player', () => {
    const bot = new Player('Bot')
    expect(bot.isHumanPlayer()).toBe(false)
  })
})

describe('#constructor', () => {
  it('starts with a name', () => {
    const name = 'Player 1'
    expect(player.name()).toEqual(name)
  })

  it('starts with a hand', () => {
    const hand = {}
    expect(player.handObject()).toEqual(hand)
  })
})

describe('#hand', () => {
  it('starts with an empty hand', () => {
    const hand = []
    expect(player.hand()).toEqual(hand)
  })
})

describe('#countHand', () => {
  it('returns the number of cards in player hand', () => {
    expect(player.countHand()).toEqual(0)
    player.retrieveCard(card)
    expect(player.countHand()).toEqual(1)
  })
})

describe('#isHandEmpty', () => {
  it('returns true if player hand is empty', () => {
    expect(player.isHandEmpty()).toBe(true)
  })

  it('returns false if player hand is not empty', () => {
    player.retrieveCard(card)
    expect(player.isHandEmpty()).toBe(false)
  })
})

describe('#addBook', () => {
  it('adds a book', () => {
    expect(player.books()).toEqual(0)
    player.addBook()
    expect(player.books()).toEqual(1)
  })
})

describe('#calculateBooks', () => {
  it('does nothing if player does not have four of one rank', () => {
    player.calculateBooks()
    expect(player.books()).toBe(0)
  })

  it('removes that rank from player hand if it have four cards', () => {
    const fourAces = [card, ...['C', 'D', 'H'].map(suit => new PlayingCard('A', suit))]
    fourAces.forEach((card) => player.retrieveCard(card))
    player.calculateBooks()
    expect(player.books()).toBe(1)
  })
})

describe('#retrieveCard', () => {
  it('adds a card to player hand', () => {
    player.retrieveCard(card)
    expect(player.hand()).toEqual([card])
  })
})

describe('#giveUpCards', () => {
  it('removes from hand and returns cards of selected rank', () => {
    var card2 = new PlayingCard('A', 'C');
    var card3 = new PlayingCard('2', 'C');
    [card, card2, card3].forEach((card) => player.retrieveCard(card))
    expect(player.giveUpCards(card.rank())).toEqual([card, card2])
    expect(player.hand()).toEqual([card3])
  })
})

describe('#hasRank', () => {
  it('returns true if player has selected rank', () => {
    player.retrieveCard(card)
    expect(player.hasRank(card.rank())).toBe(true)
  })

  it('returns false if player does not have selected rank', () => {
    expect(player.hasRank(card.rank())).toBe(false)
  })
})
})
