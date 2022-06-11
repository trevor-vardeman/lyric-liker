import { useState } from 'react'
import { useHistory, Link} from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

function Lyrics({ lyrics, currentTrackName, currentArtistName, currentAlbumName, currentAlbumArt, pixelTrackingUrl, lyricsCopyright }) {
  const [saveLyrics, setSaveLyrics] = useState(false)
  let history = useHistory()

  function clickSave() {
    if (lyrics === "No lyrics found!") alert("No lyrics to save!")
    else {
      setSaveLyrics(true)
      const songData = {
        name: currentTrackName,
        artist: currentArtistName,
        album: currentAlbumName,
        album_art: currentAlbumArt,
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
        .then(() => history.push('/songs'))
    }
  }
  
  return (
    <Stack className="d-flex justify-content-center align-items-center" gap={3}>
      <Link className="btn btn-outline-dark btn-sm" to={"/songs"}>{`< Back to Songs`}</Link>
      {lyrics !== "" ? 
      <div className="text-center" style={{ whiteSpace: "pre" }}>
        <Stack direction="horizontal" gap={3} style={{ border: "2px solid black", paddingRight: "10px" }}>
          <img src={currentAlbumArt} alt={`album artwork for ${currentAlbumName}`}/>
          <div>
            <h2 className="font-link">{currentTrackName}</h2>
            <h4><span style={{ color: "skyblue" }}>by</span> {currentArtistName}</h4>
            <h6><span style={{ color: "skyblue" }}>on</span> {currentAlbumName}</h6>
            {!saveLyrics ? <Button variant="outline-primary" size="sm" onClick={clickSave}>Save Lyrics</Button> : <Button variant="primary" size="sm" disabled>Save Lyrics</Button>}
          </div>
        </Stack>
        <p>{lyrics}</p>
        <p style={{ fontSize: "8px" }}><small>{lyricsCopyright}</small></p>
        <img src={`${pixelTrackingUrl}`} alt="" />
      </div> :
      <div className="text-center" style={{ whiteSpace: "pre" }}>{"Select a song first!"}</div>}
    </Stack>
  )
}

export default Lyrics