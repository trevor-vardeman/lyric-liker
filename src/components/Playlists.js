import React, { useEffect } from 'react'
// import { Table } from '@nextui-org/react'
import Table from 'react-bootstrap/Table';

function Playlists({ token, retrievePlaylists, playlists }) {
  useEffect(() => {
    if (token != null) {
      fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          retrievePlaylists(data.items)
        })
    }
  }, [token])

  function playlistSelection() {
    console.log("click")
  }

  // return (
  //   <div>
  //     {playlists.length > 0 ?
  //       <Table
  //         bordered
  //         shadow={true}
  //         aria-label="Table showing the user's first 20 playlists"
  //         css={{
  //           height: "100px",
  //           minWidth: "100px",
  //         }}
  //         selectionMode="single"
  //       >
  //         <Table.Header>
  //           <Table.Column>Playlists</Table.Column>
  //         </Table.Header>
  //         <Table.Body>
  //           {playlists.map((playlist) => (
  //             <Table.Row onClick={playlistSelection} key={playlist.id}>
  //               <Table.Cell>{playlist.name}</Table.Cell>
  //             </Table.Row >
  //           ))}
  //         </Table.Body>
  //       </Table>
  //     : null}
  //   </div>
  // )

  return (
    <div>
      {playlists.length > 0 ?
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>Playlists</th>
            </tr>
          </thead>
          <tbody>
            {playlists.map((playlist) => (
              <tr>
                <td key={playlist.id} onClick={playlistSelection}>{playlist.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      : null}
    </div>
  )
}

export default Playlists