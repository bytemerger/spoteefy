import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Library from '../pages/Library'
import Auth from '../pages/Auth'
import RequireAuth from './requireAuth'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='home' element={
            <RequireAuth>
              <Home />
            </RequireAuth>
        }
        />
        <Route
          path='library' element={
            <RequireAuth>
              <Library />
            </RequireAuth>
        }
        />
        <Route path='auth' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router
