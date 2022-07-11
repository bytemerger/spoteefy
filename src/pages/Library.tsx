import Navbar from '../components/ui/Navbar'
import libraryImage from '../assets/images/libraryImage.jpg'

function Library (): JSX.Element {
  return (
    <div className='md:px-40 px-3 bg-black/90 min-h-screen'>
      <Navbar page='library' />
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
    </div>
  )
}
export default Library
