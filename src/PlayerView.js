import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PlayerView extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    setRank: PropTypes.func.isRequired,
    playRound: PropTypes.func.isRequired
  }

  player() {
    return this.props.game.humanPlayer()
  }

  currentPlayer() {
    return this.props.game.currentPlayer()
  }

  render() {
    let hand
    if (this.player() === this.currentPlayer()) {
      hand = this.player().hand().map((card, index) =>
        <div className="game-list-item" key={index}>
          <button type="submit" key={index} value={card.rank()} onClick={this.props.setRank}>
            {card.toString()}
          </button>
        </div>
      )
    } else {
      hand = this.player().hand().map((card, index) =>
        <div className="game-list-item" key={index}>
          {card.toString()}
        </div>
      )
    }

    return (
      <div className="player">
        <div>
          {this.player().name()}
        </div>
        <div className="playerHand">
          {hand}
        </div>
        <div>
          Books: {this.player().books()}
        </div>
      </div>
    )
  }
}

export default PlayerView
