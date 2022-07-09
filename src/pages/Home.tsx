import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import { AppRequest } from '../libs'
import { deleteUserAccessToken, setAppError } from '../store/user'
import { useAppDispatch, useAppSelector } from '../types/hook.type'

function Home (): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.token)
  const getNewRelease = async () => {
    if (token) {
      const { items } = (await AppRequest('/browse/new-releases', token)).albums
      return items
    }
  }
  useEffect(() => {
    getNewRelease()
      .then((items) => console.log(items))
      .catch(error => {
        if (error === 'Auth Error') {
          dispatch(deleteUserAccessToken())
          dispatch(setAppError('Authentication Error Please Login again!!'))
          navigate('/')
        }
      })
  }, [])
  return (
    <div className='md:px-40 px-3 bg-black/90 min-h-screen'>
      <Navbar />
    </div>
  )
}
export default Home
