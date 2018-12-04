import Bot from '../Bot'
import Game from '../Game'

describe('Bot', () => {
  let game, bot

  beforeEach(() => {
    game = new Game('Player 1', 3)
    bot = new Bot(game)
  })

  describe('#constructor', () => {
    it('takes in a game instance', () => {
      expect(bot.game()).toEqual(game)
    })
  })

  describe('#currentPlayer', () => {
    it('returns the current player', () => {
      expect(bot.currentPlayer()).toEqual(game.currentPlayer())
    })
  })

  describe('#allPlayersExceptCurrentPlayer', () => {
    it('returns all players except for the current player', () => {
      expect(bot.allPlayersExceptCurrentPlayer()).toEqual(game.allPlayersExcept(game.currentPlayer().name()))
    })
  })

  describe('#randomRank', () => {
    it('selects a randomRank from the current player hand', () => {
      game.start()
      expect(game.currentPlayer().hand().map(card => card.rank())).toContain(bot.randomRank())
    })
  })

  describe('#randomPlayer', () => {
    it('selects a random opposing player', () => {
      expect(game.players().map(player => player.name())).toContain(bot.randomPlayer())
    })
  })
})
