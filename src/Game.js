import CardDeck from './CardDeck'
import PlayerList from './PlayerList'

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
      this._gatherRoundInfo(selectedPlayer, retrievedCards)
    } else {
      const retrievedCards = [this._drawFromDeck()]
      this._gatherRoundInfo({ name: function() { return 'deck' } }, retrievedCards)
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

  _gatherRoundInfo(cardSource, cards) {
    const currentPlayer = this.currentPlayer()
    const humanPlayer = this.humanPlayer()
    this._roundInfo = {
      currentPlayer: function() {
        return currentPlayer === humanPlayer ? 'You' : currentPlayer.name()
      },
      cardsReceived: cards.map(card => card.toString()).join(', '),
      requestedPlayer: function() {
        return cardSource === humanPlayer ? 'you' : cardSource.name()
      }
    }
  }

  roundInfo() {
    if (!this._roundInfo) this._roundInfo = null
    return this._roundInfo
  }
}

export default Game;
