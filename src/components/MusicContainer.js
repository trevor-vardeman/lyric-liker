import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch, useHistory } from "react-router-dom"
import Playlists from './Playlists'
import Songs from './Songs'
import Lyrics from './Lyrics'
import SavedLyrics from './SavedLyrics'

function MusicContainer({ token }) {
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
  const [saveLyrics, setSaveLyrics] = useState(false)
  let history = useHistory()

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
    history.push('/songs')
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
    setSaveLyrics(false)
    setCurrentTrackName(e.name)
    setCurrentArtistName(e.artists[0].name)
    setCurrentAlbumName(e.album.name)
    history.push('/lyrics')
  }

  // search for song to get track_id
  useEffect(() => {
    if (currentTrackName !== "") {
      fetch(`https://api.musixmatch.com/ws/1.1/track.search?q_artist=${currentArtistName}&q_track=${currentTrackName}&apikey=${process.env.REACT_APP_MUSIXMATCH_KEY}`)
        .then(res => res.json())
        .then(data => setCurrentTrackId(data.message.body.track_list[0].track.track_id))
        .catch(err => alert(err.message))
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

  return (
    <div>
      <Switch>
        <Route exact path="/playlists">
          <Playlists className="bg-light border" allPlaylists={allPlaylists} clickPlaylist={clickPlaylist} />
        </Route>
        <Route exact path="/songs">
          <Songs className="bg-light border" currentPlaylistTracks={currentPlaylistTracks} clickSong={clickSong} />
        </Route>
        <Route exact path="/lyrics">
          <Lyrics className="bg-light border" lyrics={lyrics} lyricsId={lyricsId} currentTrackName={currentTrackName} currentArtistName={currentArtistName} currentAlbumName={currentAlbumName} lyricsCopyright={lyricsCopyright}  />
        </Route>
        <Route path="/saved-lyrics">
          <SavedLyrics saveLyrics={saveLyrics} />
        </Route>
      </Switch>
    </div>
  )
}

export default MusicContainer