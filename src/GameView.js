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
      playRoundButton = <input type="submit" value="Play!" />
    } else {
      playRoundButton = (
        <div>
          <h6>It is {game.currentPlayer().name()}'s turn</h6>
          <button onClick={this.playRound.bind(this)}>{game.currentPlayer().name()} Play!</button>
        </div>
      )
    }

    return (
      <form onSubmit={this.playRound.bind(this)}>
        <OpponentListView opponents={opponents} setPlayer={this.setPlayer.bind(this)} selectedPlayer={this.state.selectedPlayer} />
        <div>Deck: {game.deck().count()}</div>
        <PlayerView player={game.humanPlayer()} playRound={this.playRound.bind(this)} setRank={this.setRank.bind(this)} />
        {playRoundButton}
      </form>
    )
  }

  _resetState() {
    this.setState(() => { return { selectedPlayer: null, selectedRank: null } })
  }
}

export default GameView
