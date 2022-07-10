import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import NewReleasesItem from '../components/ui/NewReleasesItem'
import SongItem from '../components/ui/SongItem'
import { AppRequest } from '../libs'
import { deleteUserAccessToken, setAppError } from '../store/user'
import { useAppDispatch, useAppSelector } from '../types/hook.type'
import { NewRelease, Song } from '../types/songs.types'

function Home (): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.token)
  const [newRelease, setNewRelease] = useState<NewRelease[]>()
  const [search, setSearch] = useState<string | null>(null)
  const [displaySongs, setDisplaySongs] = useState<Song[]>([])

  const getNewRelease = async () => {
    if (token) {
      const { items } = (await AppRequest('/browse/new-releases', token)).albums
      console.log(items)
      return items
    }
  }

  const getDefaultSongs = async (id: string) => {
    if (token) {
      const { items } = (await AppRequest(`/albums/${id}/tracks`, token))
      return items
    }
  }
  useEffect(() => {
    console.log(search)
  }, [search])

  useEffect(() => {
    getNewRelease()
      .then((items) => {
        setNewRelease(items)
        // find first album and use as default
        const defaultItem = items.find((item) => item.album_type === 'album') as NewRelease
        getDefaultSongs(defaultItem.id).then((displayItems) => {
          // regularize the songs to fit the display songs type
          displayItems = displayItems.map((item) =>
            ({
              ...item,
              album: {
                artist: item.artists,
                images: defaultItem.images,
                name: defaultItem.name,
                release_date: defaultItem.release_date
              }
            }) as Song)
          setDisplaySongs(displayItems)
        })
      })
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
      <Navbar setSearch={setSearch} />
      <div className='font-Raleway font-bold text-2xl text-white/80 mt-8'>New Releases</div>
      <div className='flex flex-nowrap mt-4 overflow-x-scroll gap-4'>
        {newRelease?.map((releaseItem, index) =>
          <NewReleasesItem {...releaseItem} type={releaseItem.album_type} key={`${releaseItem.uri}${index}`} />
        )}
      </div>
      <div className='font-Raleway font-bold text-2xl text-white/80 mt-8'>{search ? 'Search Results...' : 'Most Recent Tracks'}</div>
      <div className='flex flex-col'>
        {displaySongs?.map((songItem, index) =>
          <SongItem index={index} {...songItem} />
        )}
      </div>
      <div className='text-sm text-white/80 font font-Raleway pt-10 pb-5 text-center'>😋 Enjoy your time</div>
    </div>
  )
}
export default Home
