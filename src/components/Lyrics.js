function Lyrics({ lyrics, pixelTrackingUrl, lyricsCopyright }) {
  return (
    <div className="text-center" style={{ whiteSpace: "pre" }}>
      {lyrics !== "" ? <p>{lyrics}</p> : null}
      <p style={{ fontSize: "10px"}}><small>{lyricsCopyright}</small></p>
      <img src={`${pixelTrackingUrl}`} alt="" />
    </div>
  )
}

export default Lyrics