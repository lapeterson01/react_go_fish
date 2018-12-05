import React, { Component } from 'react';
import LoginView from './LoginView'
import GameView from './GameView'
import Game from './Game'
import Bot from './Bot'
// import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  onLogin(name, botCount) {
    const game = new Game(name, botCount)
    game.start()
    this.setState(() => { return { game: game } })
  }

  playRound(playerName, selectedRank) {
    const bot = new Bot(this.state.game)
    const opponent = playerName || bot.randomPlayer()
    const rank = selectedRank || bot.randomRank()
    this.state.game.playRound(opponent, rank)

    this.setState((state) => {
      return { game: state.game }
    })
  }

  render() {
    let view = this._view()

    return (
      <div className="App">
        {view}
      </div>
    );
  }

  _view() {
    if (this.state.game) {
      if (this.state.game.winner()) {
        return <h1>Winner: {this.state.game.winner().name()}</h1>
      } else {
        return (
          <GameView
            game={this.state.game}
            playRound={this.playRound.bind(this)}
          />
        )
      }
    } else {
      return <LoginView onLogin={this.onLogin.bind(this)} />
    }
  }
}

export default App;
