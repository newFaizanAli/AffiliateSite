import React, { createContext, useState } from 'react'
// import UserLogin from './UserLogin'


 const DataContext = createContext()

const UserContext = () => {

  // const [isLogin, setLogin] = useState(false)
  // let new_Name = 'Faizan'
  // const OBJ = {
  //   isLogin, setLogin
  // }

  return (
   <>
   {/* <DataContext.Provider value={new_Name}>
     <UserLogin />
   </DataContext.Provider> */}
   </>
  )
}

export default UserContext
export {DataContext}