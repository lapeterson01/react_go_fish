import PlayerList from '../PlayerList'
import Player from '../Player'
import PlayingCard from '../PlayingCard'

describe('PlayerList', () => {
  let player, playerList, bot1

  beforeEach(() => {
    player = new Player('Player 1')
    bot1 = new Player('Bot 1')
    playerList = new PlayerList(player.name(), 1)
  })

  describe('#constructor', () => {
    it('takes in players and adds them to player object', () => {
      expect(playerList.players()).toEqual([player, bot1])
    })
  })

  describe('#players', () => {
    it('returns the list of players', () => {
      expect(playerList.players()).toEqual([player, bot1])
    })
  })

  describe('#createBots', () => {
    it('creates a number of specified bots', () => {
      const bot2 = new Player('Bot 2')
      playerList.createBots(2)
      expect(playerList.players()).toEqual([player, bot1, bot2])
    })
  })

  describe('#currentPlayer', () => {
    it('knows whose turn it is', () => {
      expect(playerList.currentPlayer()).toEqual(player)
    })
  })

  describe('#nextTurn', () => {
    it('changes turn to the next player', () => {
      playerList.nextTurn()
      expect(playerList.currentPlayer()).toEqual(bot1)
    })
  })

  describe('#playerByName', () => {
    it('returns the player with the given name', () => {
      expect(playerList.playerByName(player.name())).toEqual(player)
    })
  })

  describe('#areAllHandsEmpty', () => {
    it('returns false if no players hands are empty', () => {
      const card = new PlayingCard('A', 'S')
      playerList.players().forEach((player) => player.retrieveCard(card))
      expect(playerList.areAllHandsEmpty()).toBe(false)
    })

    it('returns true if a player is out of cards', () => {
      expect(playerList.areAllHandsEmpty()).toBe(true)
    })
  })

  describe('#allPlayersExcept', () => {
    it('returns all players expect for player specified by name', () => {
      expect(playerList.allPlayersExcept(player.name())).toEqual([bot1])
    })
  })
})
