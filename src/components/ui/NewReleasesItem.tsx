import { addToLibrary, removeFromLibrary } from '../../store/user'
import { useAppDispatch } from '../../types/hook.type'
import { NewRelease } from '../../types/songs.types'

function NewReleasesItem ({ id, images, name, album_type, total_tracks, favourite, release_date, selectAlbum }: NewRelease & {favourite: boolean, selectAlbum: React.Dispatch<React.SetStateAction<Pick<NewRelease, 'id'|'images'|'name'|'release_date' >| undefined>>}) {
  const dispatch = useAppDispatch()
  return (
    <div className={`relative rounded-2xl w-64 h-56 flex-shrink-0 ${album_type === 'album' && 'cursor-pointer hover:border hover:border-spoteefy-green'}`} style={{ backgroundImage: `url('${images[1].url}')` }} onClick={() => { album_type === 'album' && selectAlbum({ id, images, release_date, name }) }}>
      <div className='absolute bottom-0 bg-[#646165]/80 px-5 py-3 flex flex-col w-full rounded-b-2xl'>
        <div className='font-Raleway text-base text-white/90 font-semibold'>{name}</div>
        <div className='text-sm text-white/70 font-medium'>{`${total_tracks.toString()} ${album_type === 'album' ? 'new songs' : 'new song'}`}</div>
      </div>
      {album_type === 'single'
        ? favourite
          ? <div className='absolute top-3 right-3 text-green-500 cursor-pointer text-4xl text-green-border' onClick={() => dispatch(removeFromLibrary(id))}>&hearts;</div>
          : <div className='absolute top-3 right-3 text-white cursor-pointer text-4xl text-green-border' onClick={() => dispatch(addToLibrary(id))}>&hearts;</div>
        : ''}
    </div>
  )
}
export default NewReleasesItem
