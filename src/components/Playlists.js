import Table from 'react-bootstrap/Table'

function Playlists({ allPlaylists, clickPlaylist }) {
  return (
    <div className="d-flex justify-content-center">
      {allPlaylists.length > 0 ?
        <Table striped bordered hover size="sm" variant="dark" style={{maxWidth: "max-content"}}>
          <thead>
            <tr>
              <th style={{textAlign: "center"}}>Your Playlists</th>
            </tr>
          </thead>
          <tbody>
            {allPlaylists.map((playlist) => (
              <tr key={playlist.id}>
                <td id={playlist.id} onClick={clickPlaylist}>{playlist.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      : null}
    </div>
  )
}

export default Playlists