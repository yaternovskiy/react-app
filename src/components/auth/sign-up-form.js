import React from 'react'

import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
//import { createSignUp } from '../../redux/ducks/auth';
import { SIGN_UP_REQUESTED } from '../../redux/ducks/auth'

export const SignUpForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = (payload) =>
    dispatch({ type: SIGN_UP_REQUESTED, payload })

  return (
    <div>
      <h3> Sign up </h3>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <Form>
          email
          <Field name="email" />
          password
          <Field name="password" type="password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}
