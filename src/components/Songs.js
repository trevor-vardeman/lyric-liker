import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'
import Stack from 'react-bootstrap/Stack'

function Songs({ currentPlaylistTracks, clickSong }) {
  return (
    <Stack className="d-flex justify-content-center align-items-center" gap={3}>
      <Link className="btn btn-outline-dark btn-sm" to={"/playlists"}>{`< Back to Playlists`}</Link>
      {currentPlaylistTracks.length > 0 ?
        
        <Table striped bordered hover size="sm" variant="dark" style={{maxWidth: "max-content"}}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {currentPlaylistTracks.map((playlist) => (
              <tr key={playlist.trackid} id={playlist.trackid} onClick={() => clickSong(playlist.track)}>
                <td key={playlist.track.external_ids.isrc}>{playlist.track.name}</td>
                <td key={playlist.track.href}>{playlist.track.artists[0].name}</td>
                <td key={playlist.track.uri}>{playlist.track.album.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      : 
      <div className="text-center" style={{ whiteSpace: "pre" }}>{"Select a playlist first!"}</div>}
    </Stack>
  )
}

export default Songs