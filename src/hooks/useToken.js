import React, { useEffect } from 'react'
import { Button, Grid, Text } from "@nextui-org/react"

function useToken({ saveToken, retrievePlaylists, token, logout }) {

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
    saveToken(token)
  }, [])
  
  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => retrievePlaylists(data.items))
  }, [])

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

export default useToken