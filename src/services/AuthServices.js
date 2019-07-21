import http from './BaseServices';

const register = user => {
  console.log(user)
  debugger
  return http.post('/register', user)
}

const authenticate = credentials => http.post(`/authenticate`, credentials)

const logout = () => http.post(`/logout`)

export default {
  register,
  authenticate,
  logout
}