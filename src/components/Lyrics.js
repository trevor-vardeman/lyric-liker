import { useState } from 'react'
import Button from 'react-bootstrap/Button'

function Lyrics({ lyrics, currentTrackName, currentArtistName, currentAlbumName, pixelTrackingUrl, lyricsCopyright, clickSave, saveLyrics }) {
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