import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from "react-router-dom"
import Landing from './Landing'
import Playlists from './Playlists'
import Songs from './Songs'
import Lyrics from './Lyrics'
import SavedLyrics from './SavedLyrics'
import SubmitLyrics from './SubmitLyrics'

function MusicContainer({ token }) {
  const [allPlaylists, setAllPlaylists] = useState([])
  const [currentPlaylistId, setCurrentPlaylistId] = useState("")
  const [currentPlaylistName, setCurrentPlaylistName] = useState("")
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState([])
  const [currentTrackName, setCurrentTrackName] = useState("")
  const [currentArtistName, setCurrentArtistName] = useState("")
  const [currentAlbumName, setCurrentAlbumName] = useState("")
  const [currentAlbumArt, setCurentAlbumArt] = useState("")
  const [currentTrackId, setCurrentTrackId] = useState("")
  const [lyrics, setLyrics] = useState("")
  const [pixelTrackingUrl, setPixelTrackingUrl] = useState("")
  const [lyricsCopyright, setLyricsCopyright] = useState("")
  const [lyricsId, setLyricsId] = useState("")
  const [saveLyrics, setSaveLyrics] = useState(false)
  let history = useHistory()

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
        .catch(err => alert("1: ", err))
    }
  }, [token])

  function clickPlaylist(e) {
    setCurrentPlaylistName(e.target.innerText)
    setCurrentPlaylistId(e.target.id)
    history.push('/songs')
  }

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
        .catch(err => alert("2: ", err.message))
    }
  }, [currentPlaylistId])

  function clickSong(e) {
    setSaveLyrics(false)
    setCurrentTrackName(e.name)
    setCurrentArtistName(e.artists[0].name)
    setCurrentAlbumName(e.album.name)
    setCurentAlbumArt(e.album.images[1].url)
    history.push('/lyrics')
  }

  useEffect(() => {
    if (currentTrackName !== "") {
      fetch(`https://api.musixmatch.com/ws/1.1/track.search?q_artist=${currentArtistName}&q_track=${currentTrackName}&apikey=${process.env.REACT_APP_MUSIXMATCH_KEY}`)
        .then(res => res.json())
        .then(data => setCurrentTrackId(data.message.body.track_list[0].track.track_id))
        .catch(err => alert(err.message))
    }
  }, [currentTrackName, currentArtistName])

  useEffect(() => {
    if (currentTrackId !== "") {
      fetch(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${currentTrackId}&apikey=${process.env.REACT_APP_MUSIXMATCH_KEY}`)
        .then(res => res.json())
        .then(data => {
          if (data.message.header.status_code === 200) {
            let returnedLyrics = data.message.body.lyrics.lyrics_body.split("...")
            let newLyrics = returnedLyrics[0]
            setLyrics(newLyrics)

            setLyricsId(data.message.body.lyrics.lyrics_id)
            setPixelTrackingUrl(data.message.body.lyrics.pixel_tracking_url)
            setLyricsCopyright(data.message.body.lyrics.lyrics_copyright)
          } else setLyrics("No lyrics found!")
        })
        .catch(err => alert("4: ", err.message))
    }
  },[currentTrackId])

  return (
    <div style={{ backgroundColor: "lightgrey" }}>
      <Switch>
        <Route exact path="/">
          <Landing className="bg-light border" />
        </Route>
        <Route exact path="/playlists">
          <Playlists className="bg-light border" allPlaylists={allPlaylists} clickPlaylist={clickPlaylist} />
        </Route>
        <Route exact path="/songs">
          <Songs className="bg-light border" currentPlaylistTracks={currentPlaylistTracks} currentPlaylistName={currentPlaylistName} currentPlaylistId={currentPlaylistId} clickSong={clickSong} />
        </Route>
        <Route exact path="/lyrics">
          <Lyrics className="bg-light border" lyrics={lyrics} lyricsId={lyricsId} currentTrackName={currentTrackName} currentArtistName={currentArtistName} currentAlbumName={currentAlbumName} currentAlbumArt={currentAlbumArt} lyricsCopyright={lyricsCopyright} pixelTrackingUrl={pixelTrackingUrl}  />
        </Route>
        <Route path="/saved-lyrics">
          <SavedLyrics saveLyrics={saveLyrics} />
        </Route>
        <Route path="/submit">
          <SubmitLyrics />
        </Route>
      </Switch>
    </div>
  )
}

export default MusicContainer