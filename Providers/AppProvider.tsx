import React, { createContext, useState } from 'react';


export const AppContext = createContext({})

export const AppProvider = ({children}: any) => {
    const [ user, setUser ] = useState([])
    const [ orders, setOrders ] = useState([])
  const [ menus, setMenus ] = useState([])


  return (
    <AppContext.Provider value={{
      user,
      setUser,
      orders,
      setOrders,
      menus, 
      setMenus
    }}>
        {children}
    </AppContext.Provider>
  )
}
