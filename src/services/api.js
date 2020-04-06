import firebase from 'firebase/app'
import 'firebase/auth'

import { firebaseConfig } from '../config'

class ApiService {
  constructor() {
    this.fb = firebase
    this.fb.initializeApp(firebaseConfig)
  }

  auth = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)
}

export const apiService = new ApiService()
