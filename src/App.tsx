import React from 'react'
// import SecureRoute from './components/SecureRoute'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

const App: React.FC = () => {

  return (
    <>
      <div className='grid grid-cols-5'>
        <Sidebar />
        <div className='col-start-2 col-end-6'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
