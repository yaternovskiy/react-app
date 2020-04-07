import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getPeople,
  canPeopleRedo,
  canPeopleUndo,
} from '../../redux/ducks/person'

export const PeopleList = () => {
  const dispatch = useDispatch()
  const people = useSelector(getPeople)
  const canUndo = useSelector(canPeopleUndo)
  const canRedo = useSelector(canPeopleRedo)

  return (
    <div>
      <button
        disabled={!canUndo}
        onClick={() => dispatch({ type: 'PEOPLE_UNDO', payload: {} })}
      >
        UNDO
      </button>
      <button
        disabled={!canRedo}
        onClick={() => dispatch({ type: 'PEOPLE_REDO', payload: {} })}
      >
        REDO
      </button>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            {person.id} - {person.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
