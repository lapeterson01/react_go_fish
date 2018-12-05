import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlayerView from './PlayerView'
import OpponentListView from './OpponentListView'

class GameView extends Component {
  constructor() {
    super()
    this.state = {}
  }

  static propTypes = {
    game: PropTypes.object.isRequired,
    playRound: PropTypes.func.isRequired
  }

  setPlayer(event) {
    const selectedPlayer = event.target.value
    this.setState(() => { return { selectedPlayer } })
  }

  setRank(event) {
    const selectedRank = event.target.value
    this.setState(() => { return { selectedRank } })
  }

  playRound(event) {
    event.preventDefault()

    this._resetState()
    this.props.playRound(this.state.selectedPlayer, this.state.selectedRank)
  }

  render() {
    const game = this.props.game
    const opponents = game.allPlayersExcept(game.humanPlayer  ().name())
    let playRoundButton
    if (game.currentPlayer() === game.humanPlayer()) {
      playRoundButton = <h4 className="message">It is your turn</h4>
    } else {
      playRoundButton = (
        <div>
          <h4 className="message">It is {game.currentPlayer().name()}'s turn</h4>
          <button className="playRound" onClick={this.playRound.bind(this)}>{game.currentPlayer().name()} Play!</button>
        </div>
      )
    }

    return (
      <form onSubmit={this.playRound.bind(this)}>
        <OpponentListView opponents={opponents} setPlayer={this.setPlayer.bind(this)} selectedPlayer={this.state.selectedPlayer} />
        <div className="table">Deck: {game.deck().count()}</div>
        <PlayerView game={game} playRound={this.playRound.bind(this)} setRank={this.setRank.bind(this)} />
        <div className="message">{game.roundResult()}</div>
        {playRoundButton}
      </form>
    )
  }

  _resetState() {
    this.setState(() => { return { selectedPlayer: null, selectedRank: null } })
  }
}

export default GameView
