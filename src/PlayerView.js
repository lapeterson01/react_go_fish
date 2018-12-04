import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PlayerView extends Component {
  static propTypes = {
    player: PropTypes.object.isRequired,
    setRank: PropTypes.func.isRequired,
    playRound: PropTypes.func.isRequired
  }

  render() {
    const hand = this.props.player.hand().map((card, index) =>
      <div key={index}>
        <button type="submit" key={index} value={card.rank()} onClick={this.props.setRank}>
          {card.toString()}
        </button>
      </div>
    )

    return (
      <div>
        <div>
          {this.props.player.name()}
        </div>
        <div>
          {hand}
        </div>
        <div>
          Books: {this.props.player.books()}
        </div>
      </div>
    )
  }
}

export default PlayerView
