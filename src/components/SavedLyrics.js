import { useState, useEffect } from 'react'
import Stack from 'react-bootstrap/Stack'
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
    <Stack className="d-flex justify-content-center align-items-center" gap={3}>
      <h1 className="font-link">Saved Lyrics</h1>
      {savedSongs.length > 0 ?
        savedSongs.map((song) => (
          <div key={song.id} className="text-center" style={{ whiteSpace: "pre", paddingBottom: "0.5rem" }}>
            <Stack direction="horizontal" gap={3} style={ {border: "2px solid black", paddingRight: "10px" }}>
              <img 
                style={{ width: "300px", height: "300px" }}
                src={song.album_art} 
                alt={`album artwork for ${song.album}`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src="https://via.placeholder.com/300?text=No+Album+Art"}
                }
              />
              <div>
                <h2 className="font-link">{song.name}</h2>
                <h4><span style={{ color: "skyblue" }}>by</span> {song.artist}</h4>
                <h6><span style={{ color: "skyblue" }}>on</span> {song.album}</h6>
                <Button variant="outline-danger" size="sm" onClick={() => deleteLyrics(song.id)}>Delete Lyrics</Button>
              </div>
            </Stack>
            <p>{song.lyrics}</p>
            <p style={{ fontSize: "8px" }}><small>{song.lyrics_copyright}</small></p>
            <img src={`${song.pixel_tracking_url}`} alt="" />
          </div>
        )) :
        <div className="text-center" style={{ whiteSpace: "pre" }}>{"Save some lyrics!"}</div>}
    </Stack>
  )
}

export default SavedLyrics