import React, { Component } from 'react';
import PropTypes from 'prop-types'

class LoginView extends Component {
  constructor() {
    super()
    this.state = { name: '', botCount: '' }
  }

  static propTypes = {
    onLogin: PropTypes.func.isRequired
  }

  handleSubmit(event) {
    event.preventDefault()
    const { name, botCount } = this.state
    this.props.onLogin(name, botCount)
  }

  handleChange(key, value) {
    this.setState(() => { return { [key]: value } })
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input className="login-name" type="text" name="name" value={this.state.className} onChange={(e) => this.handleChange('name', e.target.value)} />

        <label htmlFor="botCount">How Many Bots?</label>
        <select className="botCount" name="botCount" value={this.state.botCount} onChange={(e) => this.handleChange('botCount', e.target.value)}>
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
