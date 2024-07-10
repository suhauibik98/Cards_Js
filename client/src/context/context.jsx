import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const INITIALVALUE = {
  show: false,
  cards:[],
  userSlice:{
    user: null,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
  }
};

export const ContextProvider = createContext(INITIALVALUE);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIALVALUE);

  useEffect(() => {
    if (state.userSlice.token) {
      localStorage.setItem("token", JSON.stringify(state.userSlice.token));
    } else {
      localStorage.removeItem("token");
    }
  }, [state.userSlice.token]);

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

