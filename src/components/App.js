import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import NavBar from './NavBar'
import MusicContainer from './MusicContainer'

function App() {
  const [token, setToken] = useState()

  // get token for Spotify authentication
  function saveToken(token) {
    setToken(token)
  }
  
  function logout() {
    setToken("")
  }

  return (
    <div>
      {!token ? <Login token={token} saveToken={saveToken} /> : <NavBar token={token} logout={logout} />}
      <MusicContainer token={token} />
    </div>
  )
}

export default App