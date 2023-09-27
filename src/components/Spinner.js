import React  from 'react'
import Settings from './Settings.gif' 

const Spinner = ()=> {
    return (
      <div className='text-center ' style={{marginTop:'40px',marginBottom:'20px'}}>
        <img lassName="my-3" src={Settings} alt="loading" />     
      </div>
    )
}
export default Spinner
