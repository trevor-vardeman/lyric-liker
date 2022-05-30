import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import Playlists from './Playlists'
import Songs from './Songs'
import Stack from 'react-bootstrap/Stack'

function App() {
  const [token, setToken] = useState()
  const [allPlaylists, setAllPlaylists] = useState([])
  const [currentPlaylistId, setCurrentPlaylistId] = useState("")
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState([])
  const [currentTrackName, setCurrentTrackName] = useState("")
  const [currentArtistName, setCurrentArtistName] = useState("")
  const [currentTrackId, setCurrentTrackId] = useState("")

  // get token for Spotify authentication
  function saveToken(token) {
    setToken(token)
  }

  // logout of the app
  function logout() {
    setToken(null)
    window.localStorage.removeItem("token")
    setAllPlaylists([])
    setCurrentPlaylistId("")
    setCurrentPlaylistTracks([])
    setCurrentTrackName("")
    setCurrentArtistName("")
    setCurrentTrackId("")
  }

  //get user's playlists upon login
  useEffect(() => {
    if (token != null) {
      fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then(data => setAllPlaylists(data.items))
        .catch(err => alert(err))
    }
  }, [token])

  // user clicks a playlist
  function clickPlaylist(e) {
    setCurrentPlaylistId(e.target.id)
  }

  // get songs from selected playlist
  useEffect(() => {
    if (token != null && currentPlaylistId != null) {
      fetch(`https://api.spotify.com/v1/playlists/${currentPlaylistId}/tracks`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then(data => setCurrentPlaylistTracks(data.items))
        .catch(err => alert(err.message))
    }
  }, [currentPlaylistId])

  // user clicks a song
  function clickSong(e) {
    setCurrentTrackName(e.name)
    setCurrentArtistName(e.artists[0].name)
  }

  // search for song to get track_id
  useEffect(() => {
    if (currentTrackName !== "") {
      fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_artist=${currentArtistName}&q_track=${currentTrackName}&apikey=${process.env.REACT_APP_MUSIXMATCH_KEY}`)
        .then(res => res.json())
        .then(data => setCurrentTrackId(data.message.body.track_list[0].track.track_id))
        .catch(err => console.log(err.message))
    }
  }, [currentTrackName])

  return (
    <div>
        <Login token={token} saveToken={saveToken} logout={logout} />
        <Stack direction="horizontal" gap={3} style={{alignItems: "flex-start"}}>
          <Playlists className="bg-light border" token={token} allPlaylists={allPlaylists} clickPlaylist={clickPlaylist} />
          <Songs className="bg-light border" currentPlaylistTracks={currentPlaylistTracks} clickSong={clickSong} />
        </Stack>
    </div>
  )
}

export default App