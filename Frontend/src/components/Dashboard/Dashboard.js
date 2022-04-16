import React from 'react'
import AuthUser from '../AuthUser/AuthUser'
import Admin from './Admin';
import Mechanic from './Mechanic';
import CarOwner from './CarOwner';
export default function dashboard() {
  const {http, user} = AuthUser();
  if(user.role === 0)
  {
    return <Admin http={http} user={user} />
  }
  else if(user.role === 1)
  {
    return <Mechanic http={http} user={user} />
  }
  else
  {
    return <CarOwner http={http} user={user} />
  }

}
