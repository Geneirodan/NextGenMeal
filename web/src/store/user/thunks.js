import {authAPI} from "../../api/auth-api";
import {slice} from "./reducer";

const {registerSuccess, loginSuccess, roleSuccess, logoutSuccess, fail, confirmEmailSuccess} = slice.actions
export const getInfo = () => async dispatch => {
  const response = await authAPI.info()
  if (response.ok) {
    const data = await response.json();
    dispatch(loginSuccess(data))
  }
}

export const getRole = () => async dispatch => {
  const response = await authAPI.role()
  if (response.ok) {
    const data = await response.text();
    dispatch(roleSuccess(data))
  }
}

export const login = ({email, password}) => async dispatch => {
  const response = await authAPI.login(email, password)
  const action = response.ok ? loginSuccess : fail
  const data = await response.json();
  dispatch(action(data))
}

export const register = ({name, email, password, confirmPassword}) => async dispatch => {
  const response = await authAPI.register(name, email, password, confirmPassword)
  const action = response.ok ? registerSuccess : fail
  const data = await response.json();
  dispatch(action(data))
}

export const logout = () => async dispatch => {
  const res = await authAPI.logout()
  if (res.ok)
    dispatch(logoutSuccess())
}

export const confirmEmail = ({id, code}) => async dispatch => {
  const res = await authAPI.confirmEmail(id, code)
  dispatch(confirmEmailSuccess(res.ok))
}
