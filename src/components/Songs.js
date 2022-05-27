import Table from 'react-bootstrap/Table'

function Songs({ currentPlaylistTracks }) {
  return (
    <div>
      {currentPlaylistTracks.length > 0 ?
        <Table striped bordered hover size="sm" variant="dark" style={{"maxWidth": "max-content"}}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {currentPlaylistTracks.map((playlist) => (
              <div key={playlist.trackid} id={playlist.trackid}>
                <tr>
                  <td>{playlist.track.name}</td>
                  <td>{playlist.track.artists[0].name}</td>
                  <td>{playlist.track.album.name}</td>
                </tr>
              </div>
            ))}
          </tbody>
        </Table>
      : null}
    </div>
  )
}

export default Songs