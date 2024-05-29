import React from 'react'
import { useAppContext } from '../context/context'
import { Navigate } from 'react-router-dom'

const Prodector = ({children}) => {
    const { userSlice } = useAppContext()
     const {token} = userSlice

     console.log(userSlice);
     if(token)
        return children
    
    return <Navigate to="/login" replace/>

}




export default Prodector
