import CardDeck from './CardDeck'
import PlayerList from './PlayerList'
import RoundResult from './RoundResult'

class Game {
  constructor(playerName, numberOfBots, deck = new CardDeck()) {
    this._playerName = playerName
    this._numberOfBots = Number(numberOfBots)
    this._deck = deck
  }

  start() {
    this._shuffleDeck()
    this._dealCards()
  }

  playRound(playerName, rank) {
    const selectedPlayer = this.playerByName(playerName)
    if (selectedPlayer.hasRank(rank)) {
      const retrievedCards = this._giveCardsToCurrentPlayer(selectedPlayer, rank)
      this._setRoundResult(retrievedCards, selectedPlayer)
    } else {
      this._setRoundResult([this._drawFromDeck()])
      this._nextPlayerTurn()
    }
    this._calculateBooks()
  }

  winner() {
    if (this._areAllHandsEmpty() || this._isDeckEmpty()) {
      return this._calculateWinner()
    } else {
      return false
    }
  }

  humanPlayer() {
    return this.playerList().player()
  }

  currentPlayer() {
    return this.playerList().currentPlayer()
  }

  players() {
    return this.playerList().players()
  }

  playerByName(playerName) {
    return this.playerList().playerByName(playerName)
  }

  allPlayersExcept(playerName) {
    return this.playerList().allPlayersExcept(playerName)
  }

  deck() {
    return this._deck
  }

  playerList() {
    if (!this._playerList) {
      this._playerList = new PlayerList(this._humanPlayerName(), this._botCount())
    }
    return this._playerList
  }

  _giveCardsToCurrentPlayer(player, rank) {
    return this.playerList().giveCardsToCurrentPlayer(player, rank)
  }

  _shuffleDeck() {
    this.deck().shuffle()
  }

  _dealCards() {
    for (let i = 0; i < 7; i++) {
      this.players().forEach((player) => {
        this._drawFromDeck(player)
      })
    }
  }

  _humanPlayerName() {
    return this._playerName
  }

  _botCount() {
    if (!this._numberOfBots) this._numberOfBots = 1
    return this._numberOfBots
  }

  _drawFromDeck(player) {
    if (!player) player = this.playerList().currentPlayer()
    return player.retrieveCard(this.deck().deal())
  }

  _nextPlayerTurn() {
    this.playerList().nextTurn()
  }

  _areAllHandsEmpty() {
    return this.playerList().areAllHandsEmpty()
  }

  _isDeckEmpty() {
    return this.deck().isEmpty()
  }

  _calculateBooks() {
    this.playerList().calculateBooks()
  }

  _calculateWinner() {
    return this.playerList().calculateWinner()
  }

  _setRoundResult(cards, target) {
    this._roundResult = new RoundResult(this.currentPlayer(), cards, target)
  }

  roundResultObject() {
    if (!this._roundResult) this._roundResult = { toString: () => '' }
    return this._roundResult
  }

  roundResult() {
    return this.roundResultObject().toString()
  }
}

export default Game;
