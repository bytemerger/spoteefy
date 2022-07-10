import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import NewReleasesItem from '../components/ui/NewReleasesItem'
import { AppRequest } from '../libs'
import { deleteUserAccessToken, setAppError } from '../store/user'
import { useAppDispatch, useAppSelector } from '../types/hook.type'
import { NewRelease } from '../types/songs.types'

function Home (): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.token)
  const [newRelease, setNewRelease] = useState<NewRelease[]>()
  const getNewRelease = async () => {
    if (token) {
      const { items } = (await AppRequest('/browse/new-releases', token)).albums
      return items
    }
  }
  useEffect(() => {
    getNewRelease()
      .then((items) => setNewRelease(items))
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
      <div className='font-Raleway font-bold text-2xl text-white/80 mt-8'>New Releases</div>
      <div className='flex flex-nowrap mt-4 overflow-x-scroll gap-4'>
        {newRelease?.map((releaseItem, index) =>
          <NewReleasesItem {...releaseItem} type={releaseItem.album_type} key={`${releaseItem.uri}${index}`} />
        )}
      </div>
    </div>
  )
}
export default Home
