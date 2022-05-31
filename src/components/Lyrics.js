function Lyrics({ lyrics }) {
  return (
    <div>
      {lyrics !== "" ? <p className="text-center" style={{ whiteSpace: "pre" }}>{lyrics}</p> : null}
    </div>
  )
}

export default Lyrics