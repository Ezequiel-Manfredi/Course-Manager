import { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import checkRedirection from '../utils/checkRedirection'
import { ROUTES, ROUTES_REGEX, STORAGE_KEY } from '../utils/constants'

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
  const navigator = useNavigate()
  const location = useLocation()

  const getLogin = () => {
    const loginString = localStorage.getItem(STORAGE_KEY.LOGIN)
    const userLogin = JSON.parse(loginString)
    return userLogin
  }

  const [login, setlogin] = useState(getLogin())

  const saveLogin = (userLogin) => {
    localStorage.setItem(STORAGE_KEY.LOGIN, JSON.stringify(userLogin))
    setlogin(userLogin)
  }

  const removeLogin = () => {
    localStorage.removeItem(STORAGE_KEY.LOGIN)
    navigator(ROUTES.LOGIN)
    setlogin(null)
  }

  useEffect(() => {
    const pathExcept = [ROUTES_REGEX.LOGIN, ROUTES_REGEX.REGISTER]
    const pathAllow = [ROUTES_REGEX.COURSES, ROUTES_REGEX.COURSES_ID]

    checkRedirection(login, pathExcept, pathAllow, navigator)
  }, [login, location])

  return (
      <LoginContext.Provider value={{
        getLogin,
        login,
        setlogin,
        saveLogin,
        removeLogin
      }}>
        {children}
      </LoginContext.Provider>
  )
}