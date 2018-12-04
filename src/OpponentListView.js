import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OpponentListView extends Component {
  static propTypes = {
    opponents: PropTypes.array.isRequired,
    setPlayer: PropTypes.func.isRequired,
    selectedPlayer: PropTypes.string
  }

  render() {
    const opponentList = this.props.opponents.map((opponent, index) =>
      <div key={index}>
        <input type="radio" value={opponent.name()} name="opponent" checked={this.props.selectedPlayer === opponent.name()} onClick={this.props.setPlayer} />
        <div>{opponent.name()}</div>
        <div>Cards: {opponent.countHand()}</div>
        <div>Books: {opponent.books()}</div>
      </div>
    )

    return (
      <div>
        {opponentList}
      </div>
    )
  }
}

export default OpponentListView
