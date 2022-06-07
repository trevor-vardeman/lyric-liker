import Table from 'react-bootstrap/Table'
import spotifyLogo from "../images/Spotify.png"
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

function Playlists({ allPlaylists, clickPlaylist }) {
  return (
    <div className="d-flex justify-content-center">
      {allPlaylists.length > 0 ?
        <div>
          <h1 className="font-link" style={{ textAlign: "center" }}>Your Playlists</h1>
          <div style={{ textAlignLast: "center", paddingBottom: "0.5rem" }}>
            <a href="https://open.spotify.com/" target="_blank" rel="noreferrer">
              <img style={{ width: "32px", height: "32px" }} src={spotifyLogo} alt="spotify logo"/>
            </a>
            <BsFillArrowUpRightCircleFill style={{ width: "24px", height: "24px", paddingLeft: "5px" }} />
          </div>
          <Table striped bordered hover size="sm" variant="dark" style={{ maxWidth: "max-content" }}>
            <tbody>
              {allPlaylists.map((playlist) => (
                <tr key={playlist.id} style={{ cursor: "pointer" }}>
                  <td id={playlist.id} onClick={clickPlaylist}>{playlist.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>   
        </div>
      : null}
    </div>
  )
}

export default Playlists