import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import NewReleasesItem from '../components/ui/NewReleasesItem'
import SongItem from '../components/ui/SongItem'
import { AppRequest } from '../libs'
import { deleteUserAccessToken, setAppError, setUserLibrary } from '../store/user'
import { useAppDispatch, useAppSelector } from '../types/hook.type'
import { NewRelease, Song } from '../types/songs.types'

function Home (): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.user.token)
  const librarySongs = useAppSelector((state) => state.user.library)
  const [newRelease, setNewRelease] = useState<NewRelease[]>()
  const [albumSelection, setAlbumSelection] = useState<Pick<NewRelease, 'id'|'images'|'name'|'release_date' >>()
  const [search, setSearch] = useState<string | null>(null)
  const [displaySongs, setDisplaySongs] = useState<Song[]>([])

  const getNewRelease = async () => {
    if (token) {
      const { items } = (await AppRequest('/browse/new-releases', token)).albums
      return items
    }
  }

  const getDefaultSongs = async (id: string) => {
    if (token) {
      const { items } = (await AppRequest(`/albums/${id}/tracks`, token))
      return items
    }
  }

  const getSearchSongs = async (q: string) => {
    if (token) {
      const { items } = (await AppRequest(`/search?q=${q}&type=track`, token)).tracks
      return items
    }
  }
  useEffect(() => {
    if (search) {
      getSearchSongs(search).then(songs => setDisplaySongs(songs))
        .catch(error => {
          if (error === 'Auth Error') {
            dispatch(deleteUserAccessToken())
            dispatch(setAppError('Authentication Error Please Login again!!'))
            navigate('/')
          }
        })
    }
  }, [search])

  useEffect(() => {
    if (albumSelection != null) {
    // clear search
      setSearch(null)
      getDefaultSongs(albumSelection.id).then((displayItems) => {
      // regularize the songs to fit the display songs type
        displayItems = displayItems.map((item) =>
          ({
            ...item,
            album: {
              artists: item.artists,
              images: albumSelection.images,
              name: albumSelection.name,
              release_date: albumSelection.release_date
            }
          }) as Song)
        setDisplaySongs(displayItems)
      })
    }
  }, [albumSelection])

  useEffect(() => {
    if (librarySongs.length < 1) {
      dispatch(setUserLibrary())
    }
    getNewRelease()
      .then((items) => {
        setNewRelease(items)
        // find first album and use as default to list some new release
        const defaultItem = items.find((item) => item.album_type === 'album') as NewRelease
        setAlbumSelection(defaultItem)
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
      <div className='font-Raleway font-bold text-2xl text-white/80 mt-8'>New Album Releases</div>
      <div className='font-Raleway font-bold text-xs text-white/40'>Select to view songs</div>
      <div className='flex flex-nowrap mt-4 overflow-x-scroll gap-4'>
        {newRelease?.map((releaseItem, index) =>
          <NewReleasesItem {...releaseItem} type={releaseItem.album_type} key={`${releaseItem.uri}${index}`} selectAlbum={setAlbumSelection} />
        )}
      </div>
      <div className='font-Raleway font-bold text-2xl text-white/80 mt-8'>{search !== null ? 'Search Results...' : 'Most Recent... Album Tracks'}</div>
      <div className='flex flex-col'>
        {displaySongs?.map((songItem, index) =>
          <SongItem index={index} {...songItem} key={songItem.id} favourite={librarySongs.includes(songItem.id)} />
        )}
      </div>
      <div className='text-sm text-white/80 font font-Raleway pt-10 pb-5 text-center'>😋 Enjoy your time</div>
    </div>
  )
}
export default Home
