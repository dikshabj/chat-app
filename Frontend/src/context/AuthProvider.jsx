import React, {  createContext, useContext , useState } from 'react'
import Cookies from "js-cookie";
 
export const AuthContext = createContext();

export const  AuthProvider = ({children}) =>{
    //get user data from cookies or localstorage
      const initialUserState = Cookies.get("jwt") || localStorage.getItem("ChatAppUser");

      //parse the data
      const [authUser , setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : null)
  return (
    
    <AuthContext.Provider value={[authUser, setAuthUser]}>
        {children}
    </AuthContext.Provider>
      
    
  )
}

export const useAuth = () => useContext(AuthContext);
