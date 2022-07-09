import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User, AuthUserDetails } from '../types/user.type'

const initialState: User = {

}

const setUserDetails = createAsyncThunk('get/userDetails', async (user: AuthUserDetails, { dispatch, rejectWithValue }) => {
  try {
    const request = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.access_token}`
      }
    })
    if (request.status !== 200) {
      return rejectWithValue(request.statusText)
    }
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
    setUserToken: (state, action: PayloadAction<Pick<AuthUserDetails, 'access_token'>>) => {
      state.token = action.payload.access_token
    }
  },
  extraReducers: {
    [setUserDetails.rejected.type]: (state, action) => {
      console.log(action.payload)
    },
    [setUserDetails.fulfilled.type]: (state, action: PayloadAction<Pick<User, 'display_name'|'id'|'images'>>) => {
      return { ...state, ...action.payload }
    }
  }
})

const { setAuthState, setUserToken } = userSlice.actions

export { setUserDetails }

// add code to local storage without side effect in reducer
export const setAuthStateCode = (code: string) => (dispatch) => {
  localStorage.setItem('authStateCode', code)
  dispatch(setAuthState(code))
}

export const setUserAccessToken = (user: AuthUserDetails) => (dispatch) => {
  localStorage.setItem('userToken', user.access_token)
  dispatch(setUserToken(user))
}

export default userSlice.reducer
