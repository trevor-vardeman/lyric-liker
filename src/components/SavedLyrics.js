import { useEffect, useState } from 'react'
import Lyrics from './Lyrics'

function SavedLyrics({ saveLyrics }) {
  const [savedSongs, setSavedSongs] = useState([])

  useEffect(() => {
    fetch("http://localhost:3004/songs")
      .then(res => res.json())
      .then(songs => setSavedSongs(songs))
      .catch(err => alert(err.message))
  }, [saveLyrics])

  return (
    <div>
      {savedSongs.length > 0 ? 
        savedSongs.map((song) => (
          <Lyrics key={song.id} lyrics={song.lyrics} currentTrackName={song.name} currentArtistName={song.artist} currentAlbumName={song.album} lyricsCopyright={song.lyrics_copyright} />
      )) : 
      null}
    </div>
  )
}

export default SavedLyrics