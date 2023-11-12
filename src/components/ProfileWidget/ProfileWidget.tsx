import React from 'react'

import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'

import userProfile from '../../assets/user-profile.svg'
import classes from './profile-widget.module.scss'

interface None {
}

export const ProfileWidget: FunctionComponent<None> = () => {
  const navigate = useNavigate()

  const navigateToProfile = () => {
    navigate('/user')
  }

  return (
    <button className={classes.container} onClick={navigateToProfile}>
      <img src={userProfile} className={classes.userProfile} alt="Go to Profile" />
    </button>
  )
}
