import React from 'react';
import { shallow, render, mount } from 'enzyme';
import LoginView from '../LoginView'

xit('calls passed in function logged in player name', () => {
  let onLogin = jest.fn()
  const wrapper = shallow(<LoginView onLogin={onLogin} />)
  wrapper.find('.login-name').simulate('change', { target: {value: 'Test'}})
  wrapper.find('.login-submit').simulate('click')
  expect(onLogin).toBeCalledWith({name: 'Test'})
})
