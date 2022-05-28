import Table from 'react-bootstrap/Table'

function Songs({ currentPlaylistTracks, clickSong }) {
  return (
    <div>
      {currentPlaylistTracks.length > 0 ?
        <Table striped bordered hover size="sm" variant="dark" style={{minWidth: "max-content"}}>
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
                <td>{playlist.track.name}</td>
                <td>{playlist.track.artists[0].name}</td>
                <td>{playlist.track.album.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      : null}
    </div>
  )
}

export default Songs