import { useState } from 'react'
import { useHistory } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import NavBar from './NavBar'
import MusicContainer from './MusicContainer'
import Footer from './Footer'

function App() {
  const [token, setToken] = useState()
  let history = useHistory()

  // set token for Spotify authentication
  function saveToken(token) {
    setToken(token)
  }
  
  // handle logout
  function logout() {
    window.localStorage.removeItem("token")
    setToken("")
    history.push("/")
  }

  return (
    <Stack gap={3}>
      {!token ? <Login token={token} saveToken={saveToken} /> : <NavBar token={token} logout={logout} />}
      <MusicContainer token={token} />
      <Footer token={token} />
    </Stack>
  )
}

export default App