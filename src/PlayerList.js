import Player from './Player'

class PlayerList {
  constructor(playerName, numberOfBots) {
    this._player = new Player(playerName)
    this.createBots(numberOfBots)
  }

  player() {
    return this._player
  }

  playerByName(playerName) {
    return this.players().find((player) => {
      return player.name() === playerName
    })
  }

  allPlayersExcept(playerName) {
    return this.players().filter((player) => {
      return player.name() !== playerName
    })
  }

  players() {
    return [this.player(), ...this.bots()]
  }

  areAllHandsEmpty() {
    return this.players().some((player) => player.isHandEmpty())
  }

  giveCardsToCurrentPlayer(player, rank) {
    return player.giveUpCards(rank).map((card) => {
      this.currentPlayer().retrieveCard(card)
      return card
    })
  }

  bots() {
    return this._bots
  }

  createBots(numberOfBots) {
    this._bots = [...Array(numberOfBots).keys()].map(i => new Player(`Bot ${i + 1}`))
  }

  currentPlayer() {
    if (!this._currentPlayer) this._currentPlayer = this.players()[0]
    return this._currentPlayer
  }

  setTurn(player) {
    this._currentPlayer = player
  }

  nextTurn() {
    this.setTurn(this.players()[this.players().indexOf(this.currentPlayer()) + 1])
  }

  calculateWinner() {
    return this.players().reduce((winningPlayer, currentPlayer) => {
      return currentPlayer.books() > winningPlayer.books() ? currentPlayer : winningPlayer
    })
  }

  calculateBooks() {
    this.players().forEach((player) => {
      player.calculateBooks()
    })
  }
}

export default PlayerList;
