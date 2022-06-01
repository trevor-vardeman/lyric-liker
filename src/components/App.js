import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Login from './Login'
import Playlists from './Playlists'
import Songs from './Songs'
import Lyrics from './Lyrics'
import NavBar from './NavBar'
import SavedLyrics from './SavedLyrics'
import {
  Link,
  Routes,
  Route,
} from "react-router-dom"

function App() {
  const [token, setToken] = useState()
  const [allPlaylists, setAllPlaylists] = useState([])
  const [currentPlaylistId, setCurrentPlaylistId] = useState("")
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState([])
  const [currentTrackName, setCurrentTrackName] = useState("")
  const [currentArtistName, setCurrentArtistName] = useState("")
  const [currentAlbumName, setCurrentAlbumName] = useState("")
  const [currentTrackId, setCurrentTrackId] = useState("")
  const [lyrics, setLyrics] = useState("")
  const [pixelTrackingUrl, setPixelTrackingUrl] = useState("")
  const [lyricsCopyright, setLyricsCopyright] = useState("")
  const [lyricsId, setLyricsId] = useState("")

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
    setLyrics("")
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
    setCurrentAlbumName(e.album.name)
  }

  // search for song to get track_id
  useEffect(() => {
    if (currentTrackName !== "") {
      fetch(`https://api.musixmatch.com/ws/1.1/track.search?q_artist=${currentArtistName}&q_track=${currentTrackName}&apikey=${process.env.REACT_APP_MUSIXMATCH_KEY}`)
        .then(res => res.json())
        .then(data => setCurrentTrackId(data.message.body.track_list[0].track.track_id))
        .catch(err => console.log(err.message))
    }
  }, [currentTrackName, currentArtistName])

  // search for lyrics with track_id
  useEffect(() => {
    if (currentTrackId !== "") {
      fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${currentTrackId}&apikey=${process.env.REACT_APP_MUSIXMATCH_KEY}`)
        .then(res => res.json())
        .then(data => {
          if (data.message.header.status_code === 200) {
            // re-format the lyrics to remove some ugly stuff
            let returnedLyrics = data.message.body.lyrics.lyrics_body.split("...")
            let newLyrics = returnedLyrics[0]
            setLyrics(newLyrics)

            setLyricsId(data.message.body.lyrics.lyrics_id)
            setPixelTrackingUrl(data.message.body.lyrics.pixel_tracking_url)
            setLyricsCopyright(data.message.body.lyrics.lyrics_copyright)
          } else setLyrics("No lyrics found!")
        })
        .catch(err => alert(err.message))
    }
  },[currentTrackId])

  // save lyrics
  function saveLyrics() {
    const songData = {
      id: lyricsId,
      name: currentTrackName,
      artist: currentArtistName,
      album: currentAlbumName,
      lyrics: lyrics,
      lyrics_copyright: lyricsCopyright
    }
    fetch("http://localhost:3004/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songData),
    })
      .then(res => res.json())
      .then(newItem => console.log(newItem))
  }

  return (
    // <Router>
    //   {!token ? <Login token={token} saveToken={saveToken} /> : <NavBar token={token} logout={logout} />}
    //   <Link to="/playlists">Get playlists</Link>
    //   <Switch>
    //     <Route exact path="/playlists">
    //       <Playlists className="bg-light border" token={token} allPlaylists={allPlaylists} clickPlaylist={clickPlaylist} />
    //     </Route>
    //     <Route exact path="/songs">
    //       <Songs className="bg-light border" currentPlaylistTracks={currentPlaylistTracks} clickSong={clickSong} />
    //     </Route>
    //     <Route exact path="/lyrics">
    //       <Lyrics className="bg-light border" lyrics={lyrics} />
    //     </Route>
    //     <Route exact path="/saved-lyrics">
    //       <SavedLyrics />
    //     </Route>
    //   </Switch>
    // </Router>

    // <div>
    //   {!token ? <Login token={token} saveToken={saveToken} /> : <NavBar token={token} logout={logout} />}
    //   <Link to="/playlists">Get playlists</Link>
    // </div>

  <div>
    {!token ? <Login token={token} saveToken={saveToken} /> : <NavBar token={token} logout={logout} />}
    <Stack direction="horizontal" style={{alignItems: "flex-start"}}>
      <Playlists className="bg-light border" token={token} allPlaylists={allPlaylists} clickPlaylist={clickPlaylist} />
      <Songs className="bg-light border" currentPlaylistTracks={currentPlaylistTracks} clickSong={clickSong} />
      <Lyrics className="bg-light border" lyrics={lyrics} currentTrackName={currentTrackName} currentArtistName={currentArtistName} currentAlbumName={currentAlbumName} pixelTrackingUrl={pixelTrackingUrl} lyricsCopyright={lyricsCopyright} saveLyrics={saveLyrics} />
    </Stack>
  </div>
  )
}

export default App