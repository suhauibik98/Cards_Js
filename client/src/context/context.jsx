import { createContext, useContext, useReducer, useState } from "react";
import reducer from "./reducer";

const INITIALVALUE = {
  show: false,
  userSlice:{
    user: null,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
  }
};

export const ContextProvider = createContext(INITIALVALUE);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIALVALUE);
  const [userSlice, setUserSlice] = useState({
    user: null,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
  })

  const Fetch_user=(url)=>{
    
    
  }

  
  
  return (
    <ContextProvider.Provider value={{ ...state, dispatch }}>
      {children}
    </ContextProvider.Provider>
  );
};

// custom hook 
export const useAppContext = () => {
  return useContext(ContextProvider);
};

