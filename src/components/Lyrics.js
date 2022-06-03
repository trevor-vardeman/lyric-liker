import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useHistory} from "react-router-dom"

function Lyrics({ lyrics, lyricsId, currentTrackName, currentArtistName, currentAlbumName, pixelTrackingUrl, lyricsCopyright }) {
  const [saveLyrics, setSaveLyrics] = useState(false)
  let history = useHistory()

  function clickSave() {
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
      .then(newSong => {
        console.log(newSong)
        history.push('/saved-lyrics')
      })
  }
  
  return (
    <>
      {lyrics !== "" ? 
      <div className="text-center" style={{ whiteSpace: "pre" }}>
        <h2>{currentTrackName}</h2>
        <h4>{currentArtistName}</h4>
        <h6>{currentAlbumName}</h6>
        <p>{lyrics}</p>
        <p style={{ fontSize: "8px"}}><small>{lyricsCopyright}</small></p>
        <img src={`${pixelTrackingUrl}`} alt="" />
        {!saveLyrics ? <Button variant="primary" size="sm" onClick={clickSave}>Save Lyrics</Button> : <Button variant="primary" size="sm" disabled>Save Lyrics</Button>}
      </div> :
      null}
    </>
  )
}

export default Lyrics