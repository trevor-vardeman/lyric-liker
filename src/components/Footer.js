import githubLogo from "../images/GitHub-Mark-32px.png"

function Footer({ token }) {
  return (
    <>
      {!token ?
        null :
      <div style={{position: "fixed", left: 0, right: 0, bottom: 0, backgroundColor: "slategrey", textAlign: "center", padding: "5px"}}>
        <a href="https://github.com/trevortx/lyric-liker" target="_blank" rel="noreferrer">
          <img src={githubLogo} alt="github logo"/>
        </a>
      </div>}
    </>
  )
}

export default Footer