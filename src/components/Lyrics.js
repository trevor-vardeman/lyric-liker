function Lyrics({ lyrics }) {
  return (
    <div>
      {lyrics !== "" ? <p>{lyrics}</p> : null}
    </div>
  )
}

export default Lyrics