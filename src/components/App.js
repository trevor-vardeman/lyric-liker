// import React, { useState } from 'react'
// import { NextUIProvider } from '@nextui-org/react'
// import Login from './Login'
// import PlaylistContainer from './PlaylistContainer'
// import LyricContainer from './LyricContainer'
// import '../App.css'

// function App() {
//   const [token, setToken] = useState()
//   const [playlists, setPlaylists] = useState([])
//   console.log("playlists", playlists)

//   function saveToken(token) {
//     setToken(token)
//     console.log("test")
//   }

//   function wipeToken() {
//     setToken("")
//     window.localStorage.removeItem("token")
//   }

//   function retrievePlaylists(playlists) {
//     setPlaylists(playlists)
//     // console.log("playlists set", playlists)
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <NextUIProvider>
//           <Login saveToken={saveToken} retrievePlaylists={retrievePlaylists} token={token} wipeToken={wipeToken} />
//           <PlaylistContainer token={token} />
//           <LyricContainer />
//         </NextUIProvider>
//       </header>
//     </div>
//   );
// }

// export default App;

import '../App.css'
import { NextUIProvider } from '@nextui-org/react'
import Login from './Login'
// import SpotifyContainer from './SpotifyContainer'
import LyricContainer from './LyricContainer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NextUIProvider>
          <Login />
          {/* <SpotifyContainer /> */}
          <LyricContainer />
          </NextUIProvider>
      </header>
    </div>
  );
}

export default App;