import Navbar from '../components/ui/Navbar'
import libraryImage from '../assets/images/libraryImage.jpg'
import SongItem from '../components/ui/SongItem'
import { useAppDispatch, useAppSelector } from '../types/hook.type'
import { AppRequest } from '../libs'
import { useEffect, useState } from 'react'
import { Song } from '../types/songs.types'
import { deleteUserAccessToken, setAppError, setUserLibrary } from '../store/user'
import { useNavigate } from 'react-router-dom'

function Library (): JSX.Element {
  const token = useAppSelector((state) => state.user.token)
  const myLibrary = useAppSelector((state) => state.user.library)
  const userId = useAppSelector((state) => state.user.id)
  const dispatch = useAppDispatch()
  const [myLibrarySongs, setMyLibrarySongs] = useState<Song[]>()
  const navigate = useNavigate()
  useEffect(() => {
    if (myLibrary.length < 1) {
      dispatch(setUserLibrary())
    }
    getLibrarySongInfo().then((data) => {
      setMyLibrarySongs(data)
    })
  }, [])
  const getLibrarySongInfo = async () => {
    if (token) {
      if (myLibrary.length < 1) {
        return []
      }
      const { tracks } = (await AppRequest(`/tracks/?ids=${myLibrary.join(',')}`, token))
      return tracks as Song[]
    }
  }
  const createPlaylist = async (userId: string, name: string) => {
    if (token) {
      const app = await AppRequest(`/users/${userId}/playlists`, token, 'POST', {
        name: `${name}`,
        description: 'New playlist from spoteefy',
        public: true
      })
      return app
    }
  }
  const addSongsToPlaylist = async (id: string) => {
    if (token) {
      const app = await AppRequest(`/playlists/${id}/tracks?uris=${
        myLibrarySongs?.reduce((acc, val, index) => {
           return `${acc}${index !== 0 ? ',' : ''}${val.uri}`
          }, '')
      }`, token, 'POST')
      return app
    }
  }
  const exportLibrary = () => {
    const playlist = prompt('Please type in the playlist name')
    if (userId && playlist) {
      createPlaylist(userId, playlist).then((data) => {
        addSongsToPlaylist(data.id)
          .then(() => alert('Playlist has been exported'))
      }).catch(err => {
        if (err === 'Auth Error') {
          dispatch(deleteUserAccessToken())
          dispatch(setAppError('Authentication Error Please Login again!!'))
          navigate('/')
        }
      })
    }
  }
  return (
    <div className='md:px-40 px-3 bg-black/90 min-h-screen'>
      <Navbar page='library' exportLib={exportLibrary} />
      <div
        className='sm:h-72 h-40 rounded-3xl mt-6 border border-white/30 flex items-center justify-center' style={{
          backgroundImage: `url(${libraryImage})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className='font-bold text-white/90 text-4xl sm:text-8xl font-Swash'>Music is Life itself</div>
      </div>
      <div className='font-Raleway font-bold text-2xl text-white/80 mt-8'>Your favourites ❤️‍🔥</div>
      <div className='flex flex-col'>
        {myLibrarySongs?.map((songItem, index) =>
          songItem &&
            <SongItem index={index} {...songItem} key={songItem.id} favourite />
        )}
      </div>
    </div>
  )
}
export default Library
