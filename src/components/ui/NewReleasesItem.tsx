import { addToLibrary, removeFromLibrary } from '../../store/user'
import { useAppDispatch, useAppSelector } from '../../types/hook.type'
import { NewRelease } from '../../types/songs.types'

function NewReleasesItem ({ id, images, name, type, total_tracks, favourite }: NewRelease & {favourite: boolean}) {
  const dispatch = useAppDispatch()
  return (
    <div className='relative rounded-2xl w-64 h-56 flex-shrink-0' style={{ backgroundImage: `url('${images[1].url}')` }}>
      <div className='absolute bottom-0 bg-[#646165]/80 px-5 py-3 flex flex-col w-full rounded-b-2xl'>
        <div className='font-Raleway text-base text-white/90 font-semibold'>{name}</div>
        <div className='text-sm text-white/70 font-medium'>{`${total_tracks.toString()} ${type === 'album' ? 'new songs' : 'new song'}`}</div>
      </div>
      {favourite
        ? <div className='absolute top-3 right-3 text-green-500 cursor-pointer text-4xl text-green-border' onClick={() => dispatch(removeFromLibrary(id))}>&hearts;</div>
        : <div className='absolute top-3 right-3 text-white cursor-pointer text-4xl text-green-border' onClick={() => dispatch(addToLibrary(id))}>&hearts;</div>}
    </div>
  )
}
export default NewReleasesItem
