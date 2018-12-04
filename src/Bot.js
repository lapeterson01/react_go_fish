class Bot {
  constructor(game) {
    this._game = game
  }

  game() {
    return this._game
  }

  currentPlayer() {
    return this.game().currentPlayer()
  }

  allPlayersExceptCurrentPlayer() {
    return this.game().allPlayersExcept(this.currentPlayer().name())
  }

  randomRank() {
    return this.currentPlayer().hand()[this._randomIndexOf(this.currentPlayer().hand())].rank()
  }

  randomPlayer() {
    return this.allPlayersExceptCurrentPlayer()[this._randomIndexOf(this.allPlayersExceptCurrentPlayer())].name()
  }

  _randomIndexOf(array) {
    return Math.floor(Math.random() * array.length)
  }
}

export default Bot
