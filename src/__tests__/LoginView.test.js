import React from 'react';
import { shallow, render, mount } from 'enzyme';
import LoginView from '../LoginView'

it('calls passed in function logged in player name', () => {
  let onLogin = jest.fn()
  const wrapper = shallow(<LoginView onLogin={onLogin} />)
  wrapper.find('.login-name').simulate('change', { target: {
    value: 'Test',
    name: 'name'
  } })
  wrapper.find('.botCount').simulate('change', { target: {
    value: 2,
    name: 'botCount'
  }})
  wrapper.find('form').simulate('submit', { preventDefault: () => {} })
  expect(onLogin).toBeCalledWith({name: 'Test', botCount: 2})
})
