import React, { Component } from 'react'
import PropTypes from 'prop-types'

class GameView extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired
  }

  render() {
    let humanPlayer = this.props.game.humanPlayer()

    return (
      <div>
        <h1>
          Welcome To Go Fish, {humanPlayer.name()}!
        </h1>
      </div>
    )
  }
}

export default GameView
