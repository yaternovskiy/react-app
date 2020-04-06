import React from 'react'
import { useSelector } from 'react-redux'
import { getPeople } from '../../redux/ducks/person'

export const PeopleList = () => {
  const people = useSelector(getPeople)

  return (
    <ul>
      {people.map((person) => (
        <li key={person.id}>
          {person.id} - {person.email}
        </li>
      ))}
    </ul>
  )
}
