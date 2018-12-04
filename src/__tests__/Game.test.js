import Game from '../Game'
import CardDeck from '../CardDeck'
import PlayingCard from '../PlayingCard'

describe('Game', () => {
  let player, game, bot1, card1, card2

  beforeEach(() => {
    game = new Game('Player 1')
    player = game.playerList().player()
    bot1 = game.playerList().bots()[0]
    card1 = new PlayingCard('A', 'S')
    card2 = new PlayingCard('2', 'C')
  })

  describe('#constructor', () => {
    it('should start with a human player and bots', () => {
      game = new Game(player.name(), 2)
      const bot2 = game.playerList().bots()[1]
      expect(game.players()).toEqual([player, bot1, bot2])
    })

    it('should start with a deck', () => {
      expect(game.deck()).toEqual(new CardDeck())
    })
  })

  describe('#start', () => {
    it('should shuffle the cards', () => {
      const deck2 = new CardDeck()
      expect(game.deck().cards()).toEqual(deck2.cards())

      game.start()
      expect(game.deck().cards()).not.toEqual(deck2.cards())
    })

    it('should deal cards to the players', () => {
      game.start()
      expect(game.deck().count()).toEqual(38)
      expect(player.countHand()).toEqual(7)
      expect(bot1.countHand()).toEqual(7)
    })
  })

  describe('#playRound', () => {
    it('gives card from selected player to player whose turn it is if selected player has selected rank', () => {
      player.retrieveCard(card1)
      bot1.retrieveCard(card2)
      game.playRound(bot1.name(), card2.rank())
      expect(bot1.hand()).toEqual([])
      expect(player.hand()).toEqual([card2, card1])
    })

    it('draws card from deck if selected player does not have selected rank', () => {
      bot1.retrieveCard(card2)
      game.playRound(bot1.name(), card1.rank())
      expect(bot1.hand()).toEqual([card2])
      expect(player.countHand()).toBe(1)
    })

    it('changes turn to the next player when selected player does not have selected card', () => {
      bot1.retrieveCard(card2)
      game.playRound(bot1.name(), card1.rank())
      expect(game.playerList().currentPlayer()).toEqual(bot1)
    })
  })

  describe('#winner', () => {
    let fourAces

    beforeEach(() => {
      fourAces = [card1, ...['C', 'D', 'H'].map((suit) => new PlayingCard('A', suit))]
    })

    it('returns false if there is no winner', () => {
      game.players().forEach((player) => {
        player.retrieveCard(card1)
      })
      expect(game.winner()).toEqual(false)
    })

    it('returns a winner if there is one', () => {
      fourAces.forEach(card => player.retrieveCard(card))
      expect(game.winner()).toEqual(player)
    })
  })

  describe('#players', () => {
    it('should return all players', () => {
      expect(game.players()).toEqual([player, bot1])
    })
  })
})
