import { NewRelease } from '../../types/songs.types'

function NewReleasesItem ({ id, images, name, album_type, total_tracks, release_date, selectAlbum }: NewRelease & { selectAlbum: React.Dispatch<React.SetStateAction<Pick<NewRelease, 'id'|'images'|'name'|'release_date' >| undefined>>}) {
  return (
    <div className={`relative rounded-2xl w-64 h-56 flex-shrink-0 cursor-pointer hover:border hover:border-spoteefy-green`} style={{ backgroundImage: `url('${images[1].url}')` }} onClick={() => { selectAlbum({ id, images, release_date, name }) }}>
      <div className='absolute bottom-0 bg-[#646165]/80 px-5 py-3 flex flex-col w-full rounded-b-2xl'>
        <div className='font-Raleway text-base text-white/90 font-semibold'>{name}</div>
        <div className='text-sm text-white/70 font-medium'>{`${total_tracks.toString()} ${album_type === 'album' ? 'new songs' : 'new song'}`}</div>
      </div>
    </div>
  )
}
export default NewReleasesItem
