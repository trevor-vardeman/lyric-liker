import Table from 'react-bootstrap/Table'

function Playlists({ allPlaylists, clickPlaylist }) {
  return (
    <div>
      {allPlaylists.length > 0 ?
        <Table striped bordered hover size="sm" variant="dark" style={{minWidth: "max-content"}}>
          <thead>
            <tr>
              <th>Playlists</th>
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