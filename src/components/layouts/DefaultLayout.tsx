import { setAppError } from '../../store/user'
import { useAppDispatch, useAppSelector } from '../../types/hook.type'

interface props{
  children: React.ReactNode
}
function DefaultLayout ({ children }: props) {
  const error = useAppSelector((state) => state.user.error)
  const dispatch = useAppDispatch()
  const clearError = () => {
    dispatch(setAppError(null))
  }
  return (
    <>
      {children}
      {error &&
        <div className='absolute top-4 right-1 ml-2'>
          <div className='flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-100 bg-red-700/90 border border-red-700 '>
            <div slot='avatar'>
              <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-alert-octagon w-5 h-5 mx-2'>
                <polygon points='7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2' />
                <line x1='12' y1='8' x2='12' y2='12' />
                <line x1='12' y1='16' x2='12.01' y2='16' />
              </svg>
            </div>
            <div className='text-xl font-normal  max-w-full flex-initial'>
              {error}
            </div>
            <div className='flex flex-auto flex-row-reverse' onClick={clearError}>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-x cursor-pointer hover:text-red-400 rounded-full w-5 h-5 ml-2'>
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}
export default DefaultLayout
