import githubLogo from "../images/GitHub-Mark-32px.png"

function Footer({ token }) {
  let wrapperDiv = {
    display: 'block',
    padding: '8px',
    height: '8px',
    width: '100%',
  }

  let footerDiv = {
    backgroundColor: "skyblue",
    textAlign: "center",
    padding: "5px",
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
    borderTop: "2px solid black"
  }

  return (
    <>
      {!token ?
        null :
        <div>
          <div style={wrapperDiv}></div>
          <div style={footerDiv}>
            <a href="https://github.com/trevortx/lyric-liker" target="_blank" rel="noreferrer">
              <img src={githubLogo} alt="github logo"/>
            </a>
          </div>
        </div>}
    </>
  )
}

export default Footer