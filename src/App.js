import React, { Component } from 'react';
import LoginView from './LoginView'
import GameView from './GameView'
import Game from './Game'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  onLogin(values) {
    const game = new Game(values.name, values.botCount)
    this.setState({ game: game })
  }

  render() {
    let view
    if (this.state.game) {
      view = <GameView game={this.state.game} />
    } else {
      view = <LoginView onLogin={this.onLogin.bind(this)} />
    }

    return (
      <div className="App">
        {view}
      </div>
    );
  }
}

export default App;
