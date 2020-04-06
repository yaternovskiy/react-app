import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { ADD_PERSON_REQUESTED } from '../../redux/ducks/person'

export const PersonForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = (user) =>
    dispatch({ type: ADD_PERSON_REQUESTED, payload: user })

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          first name: <Field name="firstName" />
        </div>
        <div>
          last name: <Field name="lastName" />
        </div>
        <div>
          email: <Field name="email" />
        </div>
        <button type="submit">ADD PERSON</button>
      </Form>
    </Formik>
  )
}
