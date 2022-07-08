import listenImage from '../assets/images/listenImage.svg'
import spotifyIcon from '../assets/images/spotifyIcon.png'

function Login (): JSX.Element {
  return (
    <div className='min-h-screen bg-[#06132D] font-Raleway text-white'>
      <div className='sm:mx-auto mx-5 pt-5 sm:w-1/2 text-center'>
        <h1 className='text-transparent text-gradient sm:text-5xl text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
          Discover top songs around the world in a single click
        </h1>
      </div>
      <div className='sm:mx-32 mt-16 flex flex-col sm:flex-row items-center sm:items-start justify-around'>
        <div className='flex justify-center items-center w-1/2'><img src={listenImage} /></div>
        <div className='tracking-wide mt-5 sm:mt-0 flex flex-col sm:block text-center sm:text-left'>
          <div className='text-white/80 font-semibold sm:text-8xl text-5xl'>Listening is <br className='hidden sm:block' /> Everything</div>
          <div className='mt-8 text-base'>
            <div className='font-light'>Millions of songs and releases</div>
            <div className='font-bold mt-5'>No credit card</div>
          </div>
          <div className='mt-8 flex items-center justify-center sm:block'>
            <div className='text-center'>
              <div className='py-4 px-10 border rounded-xl border-white w-44 text-center bg-transparent  hover:border hover:border-purple-300 cursor-pointer'>
                <div className='flex items-center'>
                  <img src={spotifyIcon} alt='' width={24} height={24} />
                  <a className='font-Inter text-base font-semibold leading-5 text-white ml-3'>Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
