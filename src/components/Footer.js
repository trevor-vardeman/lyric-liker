import githubLogo from "../images/GitHub-Mark-32px.png"

function Footer({ token }) {
  let wrapperDiv = {
    display: 'block',
    padding: '8px',
    height: '8px',
    width: '100%',
  }

  let footerDiv = {
    backgroundColor: "lightblue",
    textAlign: "center",
    padding: "5px",
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
  }

  return (
    <>
      {!token ?
        null :
        <>
          <div style={wrapperDiv}></div>
          <div style={footerDiv}>
            <a href="https://github.com/trevortx/lyric-liker" target="_blank" rel="noreferrer">
              <img src={githubLogo} alt="github logo"/>
            </a>
          </div>
        </>}
    </>
  )
}

export default Footer