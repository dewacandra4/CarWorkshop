import React from 'react'

export default function EditService() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(user.role != 0)
    {
        return <div>You are not authorized to view this page</div>
    }
    else
    {
        return (
            
          <div>EditService</div>
        )
    }
}
