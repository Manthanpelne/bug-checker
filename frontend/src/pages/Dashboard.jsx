import React from 'react'
import { Header } from '../components/Header'

const Dashboard = ({user, onLogout}) => {
  return (
    <>
     <Header user={user} onLogout={onLogout} />
     <div>dashboard</div>
    </>
  )
}

export default Dashboard