import { Link } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import Table from 'react-bootstrap/Table'
import spotifyLogo from "../images/Spotify.png"
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

function Songs({ currentPlaylistTracks, currentPlaylistName, currentPlaylistId, clickSong }) {
  return (
    <Stack className="d-flex justify-content-center align-items-center" gap={3}>
      <Link className="btn btn-outline-dark btn-sm" to={"/playlists"}>{`< Back to Playlists`}</Link>
      {currentPlaylistTracks.length > 0 ?
        <div>
          <h1 className="font-link" style={{ textAlign: "center" }}>{currentPlaylistName}</h1>
          <div style={{ textAlignLast: "center", paddingBottom: "0.5rem" }}>
            <a href={`https://open.spotify.com/playlist/${currentPlaylistId}`} target="_blank" rel="noreferrer">
              <img style={{ width: "32px", height: "32px" }} src={spotifyLogo} alt="spotify logo"/>
            </a>
            <BsFillArrowUpRightCircleFill style={{ width: "24px", height: "24px", paddingLeft: "5px" }} />
          </div>   
          <Table striped bordered hover size="sm" variant="dark" style={{ maxWidth: "max-content" }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
              </tr>
            </thead>
            <tbody>
              {currentPlaylistTracks.map((playlist) => (
                <tr key={playlist.trackid} id={playlist.trackid} onClick={() => clickSong(playlist.track)} style={{ cursor: "pointer" }}>
                  <td key={playlist.track.external_ids.isrc}>{playlist.track.name}</td>
                  <td key={playlist.track.href}>{playlist.track.artists[0].name}</td>
                  <td key={playlist.track.uri}>{playlist.track.album.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      : 
      <div className="text-center" style={{ whiteSpace: "pre" }}>{"Select a playlist first!"}</div>}
    </Stack>
  )
}

export default Songs