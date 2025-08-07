import React from 'react'
const user=localStorage.getItem("existingUser")
const page = () => {
  return (
    <div>
      <div>Hi `${user}`</div>
    </div>
  )
}

export default page
