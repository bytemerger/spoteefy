import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import spotiIcon from '../../assets/images/spotifyIcon.png'
import { debounce } from '../../libs'
import { logoutUser } from '../../store/user'
import { useAppDispatch, useAppSelector } from '../../types/hook.type'

type Page = 'library' | 'home'

const ButtonGroup = ({ page, exportLib }: {page: Page, exportLib?: () => void}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const logout = useCallback(() => {
    dispatch(logoutUser())
    navigate('/')
  }, [])
  return (
    <>
      {page === 'library' &&
        <div className='py-0.5 px-2 sm:py-3 sm:px-5 border rounded-xl border-white text-center bg-transparent  hover:border hover:border-spoteefy-green cursor-pointer ml-5 outline-none mr-3' onClick={exportLib}>
          <div className='flex items-center'>
            <img src={spotiIcon} width={24} height={24} />
            <a className='font-Raleway text-base leading-5 text-white sm:font-semibold'>Export</a>
          </div>
        </div>}
      <Link to={page === 'home' ? '/library' : '/home'}>
        <span className='bg-spoteefy-green text-white rounded-lg py-1.5 px-3.5 sm:py-3 sm:px-5 font-Raleway text-base font-medium sm:font-semibold'>
          {page === 'home' && 'library'}
          {page === 'library' && 'home'}
        </span>
      </Link>
      <div className='py-1 px-4 sm:py-3 sm:px-5 border rounded-xl border-white text-center bg-transparent  hover:border hover:border-spoteefy-green cursor-pointer ml-5 outline-none' onClick={logout}>
        <div className='text-center'>
          <a className='font-Raleway text-base leading-5 text-white sm:font-semibold'>Logout</a>
        </div>
      </div>
    </>
  )
}
function Navbar ({ setSearch, page = 'home', exportLib }: { setSearch?: React.Dispatch<React.SetStateAction<string | null>>, page?: Page, exportLib?: () => void}) {
  const username = useAppSelector((state) => state.user.display_name)
  const userImage = useAppSelector((state) => {
    if ((state.user.images != null) && state.user.images.length > 0) return state.user.images[1].url
    return undefined
  })

  // debouce the search to reduce api calls
  const debouncedSearch = debounce(setSearch, 500)

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.currentTarget.value)
  }
  return (
    <div className='flex flex-col sm:flex-row justify-between pt-5 sm:pt-10 sm:items-center'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img src={userImage || spotiIcon} alt='' width={35} height={35} />
          <span className='hidden sm:block text-white/80 ml-2'>{username}</span>
        </div>
        <div className='items-center flex sm:hidden'>
          <ButtonGroup page={page} exportLib={exportLib} />
        </div>
      </div>
      {
      page === 'home' &&
        <div className='mt-4 sm:mt-0'>
          <input type='text' className='font-Raleway font-light text-base leading-5 md:w-[522px] w-full text-[#d0d2d6] rounded-full h-8 sm:h-12 sm:px-3 px-3 outline-none bg-[#646165]' placeholder='search...' onChange={onSearchChange} />
        </div>
      }
      <div className='items-center hidden sm:flex'>
        <ButtonGroup page={page} exportLib={exportLib} />
      </div>
    </div>
  )
}
export default Navbar
