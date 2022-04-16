import React from 'react'

export default function CarOwner(http, user) {
  return (
    <div>
        <h1>Car Owner</h1>
        Welcome {user.email}
    </div>
  )
}
