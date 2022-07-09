import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Library from '../pages/Library'
import Auth from '../pages/Auth'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='home' element={<Home />} />
        <Route path='library' element={<Library />} />
        <Route path='auth' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router
