import Button from 'react-bootstrap/Button'

function Lyrics({ lyrics, currentTrackName, currentArtistName, currentAlbumName, pixelTrackingUrl, lyricsCopyright, saveLyrics }) {
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
        <Button variant="primary" size="sm" onClick={saveLyrics}>Save Lyrics</Button>
      </div> :
      null}
    </>
  )
}

export default Lyrics