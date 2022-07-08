import listenImage from '../assets/images/listenImage.svg'
import spotifyIcon from '../assets/images/spotifyIcon.png'

function Login (): JSX.Element {
  return (
    <div className='min-h-screen bg-[#06132D] font-Raleway text-white'>
        <div className="mx-auto pt-5 w-1/2 text-center">
            <h1 className="text-transparent text-gradient text-5xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Discover top songs around the world in a single click</h1>
        </div>
        <div className="sm:mx-32 mt-16 flex justify-around">
          <div className='flex justify-center items-center w-1/2'><img src={listenImage}/></div>
          <div className='tracking-wide'>
            <div className='text-white/80 font-semibold text-8xl'>Listening is <br /> Everything</div>
            <div className='mt-8 text-base'>
              <div className='font-light'>Millions of songs and releases</div>
              <div className='font-bold mt-5'>No credit card</div>
            </div>
            <div className='mt-8'>
              <div className="text-center">
                  <div className='py-4 px-10 border rounded-xl border-white w-44 text-center bg-transparent  hover:border hover:border-purple-300 cursor-pointer'>
                      <div className='flex items-center'>
                        <img src={spotifyIcon} alt="" width={24} height={24}/>
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
