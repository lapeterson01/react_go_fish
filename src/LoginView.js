import React, { Component } from 'react';
import PropTypes from 'prop-types'

class LoginView extends Component {
  constructor() {
    super()
    this.state = { name: '', botCount: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    onLogin: PropTypes.func.isRequired
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onLogin(this.state)
  }

  handleChange(event) {
    debugger
    if (event.target.name === 'name') {
      this.setState({ name: event.target.value })
    } else if (event.target.name === 'botCount') {
      this.setState({ botCount: event.target.value })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input className="login-name" type="text" name="name" value={this.state.className} onChange={this.handleChange} />

        <label htmlFor="botCount">How Many Bots?</label>
        <select className="botCount" name="botCount" value={this.state.botCount} onChange={this.handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <button className="login-submit" type="submit">Login</button>
      </form>
    )
  }
}

export default LoginView;
