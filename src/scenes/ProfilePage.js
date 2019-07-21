import React from 'react'
import SignUp from '../components/forms/Singup'
import { withAuthConsumer } from '../contexts/AuthStore';
const ProfilePage = (props) => <SignUp {...props} />

export default withAuthConsumer(ProfilePage)