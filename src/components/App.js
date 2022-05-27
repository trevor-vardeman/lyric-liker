import { useState } from 'react'
// import { NextUIProvider } from '@nextui-org/react'
import Login from './Login'
import Playlists from './Playlists'
import LyricContainer from './LyricContainer'

function App() {
  const [token, setToken] = useState()
  const [playlists, setPlaylists] = useState([])

  function saveToken(token) {
    setToken(token)
  }

  function logout() {
    setToken(null)
    window.localStorage.removeItem("token")
    setPlaylists([])
  }

  function retrievePlaylists(playlists) {
    setPlaylists(playlists)
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <NextUIProvider> */}
          <Login token={token} saveToken={saveToken} logout={logout} />
          <Playlists token={token} retrievePlaylists={retrievePlaylists} playlists={playlists} />
          <LyricContainer />
        {/* </NextUIProvider> */}
      </header>
    </div>
  );
}

export default App;