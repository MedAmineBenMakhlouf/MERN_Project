import { useState,useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './views/Register'
import Login from './views/Login'
import DashboardUser from './views/DashboardUser'
import Landing_Page from './components/Landing_Page'
import MyDevices from './components/MyDevices'
import AddDevices from './components/AddDevices'
import UpdateUser from './components/UpdateUser'
import DashboardAdmin from './views/DashboardAdmin'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import DetailsDevice from './components/DetailsDevice'

function App() {
  const baseUrl = "http://localhost:8000/api"

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing_Page />} />
        <Route path='/register' element={<Register baseUrl={baseUrl}/>} />
        <Route path='/login' element={<Login baseUrl={baseUrl} />} />
        <Route path='/dashboardUser' element={<DashboardUser baseUrl={baseUrl}/>} />
        <Route path='/dashboardAdmin' element={<DashboardAdmin baseUrl={baseUrl}/>} />
        <Route path='/MyDevices' element={<MyDevices baseUrl={baseUrl}/>} />
        <Route path='/devices/Add' element={<AddDevices baseUrl={baseUrl}/>} />
        <Route path='/user' element={<UpdateUser baseUrl={baseUrl}/>} />
        <Route path='/devices/:id/edit' element={<DetailsDevice baseUrl={baseUrl}/>}/>
        </Routes>
    </>
  )
}

export default App
