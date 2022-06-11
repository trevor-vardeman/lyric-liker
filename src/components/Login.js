import { useEffect } from 'react'
import Stack from 'react-bootstrap/Stack'

function Login({ token, saveToken }) {
  const CLIENT_ID = "c3404f8cae724e35997b47c8531879c4"
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

return (
    <Stack gap={3} className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <h1 style={{ fontSize: "100px", color: "skyblue"}} className="font-link">Lyric Liker</h1>
      <p>Find lyrics to songs in your Spotify playlists, or search for lyrics by artist and song name, and save them for later.</p>
      {!token ? <a className="btn btn-success" href={`${url}`}>Log in with Spotify</a> : null}
    </Stack>
  )
}

export default Login