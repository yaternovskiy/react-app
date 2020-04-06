import React, { Component } from 'react'

import { PersonForm } from '../person/person-form'
import { PeopleList } from '../person/people-list'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <PersonForm />
        <PeopleList />
      </div>
    )
  }
}

export default AdminPage
