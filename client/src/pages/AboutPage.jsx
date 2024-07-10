import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { decrement, increment ,rest ,incrementByAmout } from '../store/slice/userSlice'
import { useState } from 'react'
const AboutPage = () => {

   const dispatch  = useDispatch()
   const count = useSelector((state)=> state.user.c)
const [num ,setnum]= useState(0)
const addvalue = Number(num) || 0 ;

   const restAll =()=>{
    setnum(0)
    dispatch(rest())
   }


  const location = useLocation()
  // console.log(location.state)
  return (
    <div className='text-center'>
        {count}

        <hr/>
        <button onClick={()=>dispatch(increment())}>+</button>
        <hr/>
        <button onClick={()=>dispatch(decrement())}>-</button>
     <div>
      <input 
      type="text"
      value={num}
      onChange={(e)=>setnum(e.target.value)}
      />
      <button onClick={()=>dispatch(incrementByAmout(addvalue))}>amount</button>
<hr/>
      <button onClick={restAll}>rest</button>
     </div>
    </div>

  )
}

export default AboutPage
