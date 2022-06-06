import Table from 'react-bootstrap/Table'

function Playlists({ allPlaylists, clickPlaylist }) {
  return (
    <div className="d-flex justify-content-center">
      {allPlaylists.length > 0 ?
        <div>
          <h1 className="font-link" style={{ textAlign: "center" }}>Your Playlists</h1>
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