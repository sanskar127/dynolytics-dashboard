import React from 'react'
// import SecureRoute from './components/SecureRoute'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './app/store'

const App: React.FC = () => {

  const { user, status, error } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()


  return (
    <>
      <div className='grid grid-cols-5'>
        <Sidebar user="Admin" onLogout={() => { }} />
        <div className='col-start-2 col-end-6'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
