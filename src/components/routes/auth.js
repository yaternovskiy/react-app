import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { ROUTE_PATH } from '../../constants'

import { SignUpForm } from '../auth/sign-up-form'
import { SignInForm } from '../auth/sign-in-form'

class AuthPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <Route path={ROUTE_PATH.SIGN_IN} component={SignInForm} />
        <Route path={ROUTE_PATH.SIGN_UP} component={SignUpForm} />
        <Redirect from={ROUTE_PATH.AUTH} to={ROUTE_PATH.SIGN_UP} />
      </div>
    )
  }
}

export default AuthPage
