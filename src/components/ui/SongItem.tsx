import { milliSecondsToMinSec } from '../../libs'
import { Image } from '../../types/image.type'
import { Song } from '../../types/songs.types'

interface props extends Song{
  index: Number
}
function SongItem ({ index, album, name, duration_ms }: props) {
  const artistsName = album.artists.reduce((acc, prev, index) => {
    return `${acc} ${index > 0 ? '&' : ''} ${prev.name}`
  }, '')
  return (
    <div className='flex items-center text-white/50 font-Raleway mt-3 justify-between'>
      <div className='flex items-center'>
        <div className='font-bold text-3xl hidden md:block'>{index.toString().length > 1 ? index.toString() : `0${index.toString()}`}</div>
        <div className='h-14 w-14 ml-2'>
          <img src={album.images[0].url} className='rounded-md' />
        </div>
        <div className='flex flex-col md:w-96 ml-2'>
          <span className='text-white/90 font-semibold'>{name.length > 30 ? `${name.substring(0, 27)}...` : name}</span>
          <span>{album.name}</span>
        </div>
      </div>
      <div className='items-center w-2/5 justify-between hidden md:flex'>
        <span className='w-48'>{artistsName}</span>
        <span>{album.release_date}</span>
        <span>{milliSecondsToMinSec(duration_ms)}</span>
      </div>
      <div className='text-red-500 cursor-pointer text-xl'> &#9825; </div>
    </div>
  )
}
export default SongItem
