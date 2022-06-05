import { useState } from 'react'
import { useHistory, Link} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'

function Lyrics({ lyrics, lyricsId, currentTrackName, currentArtistName, currentAlbumName, pixelTrackingUrl, lyricsCopyright }) {
  const [saveLyrics, setSaveLyrics] = useState(false)
  let history = useHistory()

  function clickSave() {
    if (lyrics === "No lyrics found!") alert("No lyrics to save!")
    else {
      setSaveLyrics(true)
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
        .then(newSong => history.push('/songs'))
    }
  }
  
  return (
    <Stack className="d-flex justify-content-center align-items-center" gap={3}>
      <Link className="btn btn-outline-dark btn-sm" to={"/songs"}>{`< Back to Songs`}</Link>
      {lyrics !== "" ? 
      <div className="text-center" style={{ whiteSpace: "pre" }}>
        <h2>{currentTrackName}</h2>
        <h4>{currentArtistName}</h4>
        <h6>{currentAlbumName}</h6>
        <p>{lyrics}</p>
        <p style={{ fontSize: "8px"}}><small>{lyricsCopyright}</small></p>
        <img src={`${pixelTrackingUrl}`} alt="" />
        {!saveLyrics ? <Button variant="outline-primary" size="sm" onClick={clickSave}>Save Lyrics</Button> : <Button variant="primary" size="sm" disabled>Save Lyrics</Button>}
      </div> :
      <div className="text-center" style={{ whiteSpace: "pre" }}>{"Select a song first!"}</div>}
    </Stack>
  )
}

export default Lyrics