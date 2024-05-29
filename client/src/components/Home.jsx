import React from 'react'
// import Cards from './Cards'
import { useAppContext } from '../context/context'
import { SHOWNAV } from '../context/actions'
const Home = () => {
const {show , dispatch} = useAppContext()

const ha =()=>{
  dispatch({type: SHOWNAV})
  console.log(show);
}

  return (
    <div className='flex flex-col justify-center items-center'>
        HOME
      <button onClick={ha} >lkjoih</button>
    </div>
  )
}

export default Home
