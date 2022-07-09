import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User, AuthUserDetails } from '../types/user.type'
import { LOCAL_STORAGE_AUTH_STATE_CODE, LOCAL_STORAGE_TOKEN } from '../types/constants'

const initialState: User = {
  token: localStorage.getItem(LOCAL_STORAGE_TOKEN)
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
    return { id, display_name, images }
  } catch (error) {
    return rejectWithValue('Opps there seems to be an error')
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
    }
  },
  extraReducers: {
    [setUserDetails.rejected.type]: (state, action) => {
      state.error = action.payload
    },
    [setUserDetails.fulfilled.type]: (state, action: PayloadAction<Pick<User, 'display_name'|'id'|'images'>>) => {
      return { ...state, ...action.payload }
    }
  }
})

const { setAuthState, setUserToken, setAppError } = userSlice.actions

export { setUserDetails, setAppError }

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

export default userSlice.reducer
