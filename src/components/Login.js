// import React, { useState, useEffect } from 'react'
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { Button, Grid, Text } from "@nextui-org/react"
// import useToken from '../hooks/useToken'

// function Login({ saveToken, retrievePlaylists, token, wipeToken }) {
//   // const [loggedIn, setLoggedIn] = useState(false)

//   const CLIENT_ID = "99783215c9484f9280b7aa9ff357e33a"
//   const REDIRECT_URI = "http://localhost:3000"
//   const scope = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-collaborative playlist-read-private user-top-read'

//   let url = 'https://accounts.spotify.com/authorize'
//   url += '?response_type=token'
//   url += '&client_id=' + encodeURIComponent(CLIENT_ID)
//   url += '&scope=' + encodeURIComponent(scope)
//   url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI)

//   useEffect(() => {
//     const hash = window.location.hash
//     let token = window.localStorage.getItem("token")

//     if (!token && hash) {
//         token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

//         window.location.hash = ""
//         window.localStorage.setItem("token", token)
//         saveToken(token)
//     }
//     if (loggedIn === true) {
//       saveToken(token)
//     }
//     // saveToken(token)
//   }, [loggedIn])

//   // useEffect(() => {
//   //   const hash = window.location.hash
//   //   let token = window.localStorage.getItem("token")

//   //   if (!token && hash) {
//   //       token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

//   //       window.location.hash = ""
//   //       window.localStorage.setItem("token", token)
//   //       saveToken(token)
//   //   }
//   // }, [])

//     // return (
//   //   <div>
//   //     <Grid.Container gap={2}>
//   //       {!loggedIn ?
//   //         <Grid>
//   //           <Button auto color="success" rounded bordered onClick={login}>
//   //           Login
//   //           </Button>
//   //         </Grid>
//   //       : <Grid>
//   //           <Button auto color="error" rounded bordered onClick={logout}>
//   //           Logout
//   //           </Button>
//   //         </Grid>}
//   //     </Grid.Container>
//   //     <script src="https://sdk.scdn.co/spotify-player.js"></script>
//   //   </div>
//   // )

//   useEffect(() => {
//     if (loggedIn === true) {
//       fetch(`${url}`, {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Access-Control-Allow-Origin": "http://localhost:3000"
//         },
//       })
//         .then(res => res.json())
//         .then(data => retrievePlaylists(data.items))
//     }
//   }, [loggedIn])

//   function login() {
//     setLoggedIn(true)
//   }

//   function logout() {
//     setLoggedIn(false)
//     wipeToken()
//   }

//   return (
//     <div>
//       {!token ?
//       <a href={`${url}`}>
//         <Text
//           h1
//           size={60}
//           css={{
//             textGradient: "45deg, $blue600 0%, $green600 90%",
//           }}
//           weight="bold"
//         >Log in with Spotify
//         </Text>
//       </a>
//       : <Grid.Container gap={2}>
//           <Grid>
//             <Button auto color="error" rounded bordered onClick={logout}>
//             Logout
//             </Button>
//           </Grid>
//         </Grid.Container>}
//       <script src="https://sdk.scdn.co/spotify-player.js"></script>
//     </div>
//   )
// }

// export default Login

import React, { useState, useEffect } from 'react'
import { Button, Grid, Text } from "@nextui-org/react"

function Login() {
  const [token, setToken] = useState("")

  const CLIENT_ID = "99783215c9484f9280b7aa9ff357e33a"
  const REDIRECT_URI = "http://localhost:3000"
  const scope = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-collaborative playlist-read-private user-top-read'

  let url = 'https://accounts.spotify.com/authorize'
  url += '?response_type=token'
  url += '&client_id=' + encodeURIComponent(CLIENT_ID)
  url += '&scope=' + encodeURIComponent(scope)
  url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI)

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])

    useEffect(() => {
      fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          // "Access-Control-Allow-Origin": "http://localhost:3000"
        },
      })
        .then(res => res.json())
        .then(data => console.log(data.items))
  }, [token])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
    <div>
      {!token ?
      <a href={`${url}`}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 0%, $green600 90%",
          }}
          weight="bold"
        >Log in with Spotify
        </Text>
      </a>
      : <Grid.Container gap={2}>
          <Grid>
            <Button auto color="error" rounded bordered onClick={logout}>
            Logout
            </Button>
          </Grid>
        </Grid.Container>}
      <script src="https://sdk.scdn.co/spotify-player.js"></script>
      
    </div>
  )
}

export default Login