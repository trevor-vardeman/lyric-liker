import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'

function SavedLyrics({ saveLyrics }) {
  const [savedSongs, setSavedSongs] = useState([])
  const [deleteSong, setDeleteSong] = useState(false)

  // update saved lyrics when a new song is saved
  useEffect(() => {
    fetch("http://localhost:3004/songs")
      .then(res => res.json())
      .then(songs => {
        setSavedSongs(songs)
        setDeleteSong(false)
      })
      .catch(err => alert(err.message))
  }, [saveLyrics, deleteSong])

  // delete lyrics from database
  function deleteLyrics(id) {
    fetch(`http://localhost:3004/songs/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => setDeleteSong(true))
  }

  return (
    <div>
      {savedSongs.length > 0 ? 
        savedSongs.map((song) => (
          <div key={song.id} className="text-center" gap={3} style={{ whiteSpace: "pre", paddingBottom:"10px" }}>
            <h2 className="font-link">{song.name}</h2>
            <h4>{song.artist}</h4>
            <h6>{song.album}</h6>
            <p>{song.lyrics}</p>
            <p style={{ fontSize: "8px"}}><small>{song.lyrics_copyright}</small></p>
            {!saveLyrics ? <Button variant="outline-danger" size="sm" onClick={() => deleteLyrics(song.id)}>Delete Lyrics</Button> : <Button variant="danger" size="sm" disabled>Save Lyrics</Button>}
          </div> 
        )) :
        <div className="text-center" style={{ whiteSpace: "pre" }}>
          <p>Go save some lyrics!</p>
        </div>
      }
    </div>
  )
}

export default SavedLyrics