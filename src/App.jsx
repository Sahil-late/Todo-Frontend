import React from 'react'
import Home from './components/home'
import Login from './pages/login'
import SignIn from './pages/signIn'
import ForgetPassword from './pages/forgetPassword'
import WithoutLogin from './components/withoutLogin'
import { BrowserRouter , Routes,Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signIn' element={<SignIn/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/forgetPassword' element={<ForgetPassword/>}/>
        <Route path='/withoutLogin' element={<WithoutLogin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App