import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User, AuthUserDetails } from '../types/user.type'
import { LOCAL_STORAGE_AUTH_STATE_CODE, LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from '../types/constants'
import * as libraryService from '../services/library'
import { RootState, store } from '.'

const getUserInfo = () => {
  const userInfo = localStorage.getItem(LOCAL_STORAGE_USER)
  if (userInfo) return JSON.parse(userInfo)
}
const initialState: User = {
  token: localStorage.getItem(LOCAL_STORAGE_TOKEN),
  library: [],
  ...getUserInfo()
}

const setUserDetails = createAsyncThunk('get/userDetails', async (user: AuthUserDetails, { dispatch, rejectWithValue }) => {
  // delete the token incase it user refresh fails then
  deleteUserAccessToken()(dispatch)
  try {
    const request = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.access_token}`
      }
    })
    if (request.status !== 200) {
      const message = (await request.json()).error.message
      return rejectWithValue(message)
    }
    // set token when fetch is successful
    setUserAccessToken(user)(dispatch)
    const { id, display_name, images } = await request.json()

    const userInfo = { id, display_name, images }

    let library = await libraryService.getOrCreateLibrary(id)

    if (!library) {
      library = []
    }

    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(userInfo))
    return { ...userInfo, library }
  } catch (error) {
    return rejectWithValue('Opps there seems to be an error')
  }
})

// ---Adding and removing firestore library--
const setUserLibrary = createAsyncThunk<string[], never, {state: {user: User}}>('set/library', async (_, { getState, rejectWithValue }) => {
  try {
    let library = await libraryService.getOrCreateLibrary(getState().user.id!)
    if (!library) {
      library = []
    }
    return library
  } catch (error) {
    rejectWithValue(`error occured${error.message}`)
  }
})
const addToLibrary = createAsyncThunk<any, string, {state: {user: User}}>('add/library', async (songId: string, { getState, rejectWithValue }) => {
  try {
    await libraryService.addToLibrary(getState().user.id!, songId)
    return songId
  } catch (error) {
    rejectWithValue(`error occured${error.message}`)
  }
})
const removeFromLibrary = createAsyncThunk<any, string, {state: {user: User}}>('remove/library', async (songId: string, { getState, rejectWithValue }) => {
  try {
    await libraryService.removeFromLibrary(getState().user.id!, songId)
    return songId
  } catch (error) {
    rejectWithValue(`error occured${error.message}`)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<string>) => {
      state.authStateCode = action.payload
    },
    setUserToken: (state, action: PayloadAction<Pick<AuthUserDetails, 'access_token'> | null>) => {
      state.token = (action.payload != null) ? action.payload.access_token : null
    },
    setAppError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    resetState: (state) => {
      return {} as User
    },
    setLibrary: (state, action: PayloadAction<string[]>) => {
      state.library = action.payload
    }
  },
  extraReducers: {
    [setUserDetails.rejected.type]: (state, action) => {
      state.error = action.payload
    },
    [setUserDetails.fulfilled.type]: (state, action: PayloadAction<Pick<User, 'display_name'|'id'|'images'>>) => {
      return { ...state, ...action.payload }
    },
    [setUserLibrary.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
      state.library = action.payload
    },
    [setUserLibrary.rejected.type]: (state, action) => {
      state.error = action.payload
    },
    [addToLibrary.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.library.push(action.payload)
    },
    [addToLibrary.rejected.type]: (state, action) => {
      state.error = action.payload
    },
    [removeFromLibrary.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.library = state.library.slice().filter(id => id !== action.payload)
    },
    [removeFromLibrary.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})

const { setAuthState, setUserToken, setAppError, resetState } = userSlice.actions

export { setUserDetails, setAppError, setUserLibrary, addToLibrary, removeFromLibrary }

// add code to local storage without side effect in reducer
export const setAuthStateCode = (code: string) => (dispatch) => {
  localStorage.setItem(LOCAL_STORAGE_AUTH_STATE_CODE, code)
  dispatch(setAuthState(code))
}

export const setUserAccessToken = (user: AuthUserDetails) => (dispatch) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN, user.access_token)
  dispatch(setUserToken(user))
}

export const deleteUserAccessToken = () => (dispatch) => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN)
  dispatch(setUserToken(null))
}
export const logoutUser = () => (dispatch) => {
  deleteUserAccessToken()(dispatch)
  dispatch(resetState())
  localStorage.clear()
}

export default userSlice.reducer
