function Lyrics({ lyrics, pixelTrackingUrl }) {
  return (
    <div>
      {lyrics !== "" ? <p className="text-center" style={{ whiteSpace: "pre" }}>{lyrics}</p> : null}
      <img src={`${pixelTrackingUrl}`} alt="" />
    </div>
  )
}

export default Lyrics