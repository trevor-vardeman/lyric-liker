import React, { useEffect } from 'react'
import { Table } from '@nextui-org/react'

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
          console.log(data.items)
          retrievePlaylists(data.items)
        })
    }
  }, [token])

  return (
    <div>
      {playlists.length > 0 ?
        <Table
          bordered
          shadow={false}
          aria-label="Table showing the user's first 20 playlists"
          css={{
            height: "100px",
            minWidth: "100px",
          }}
          selectionMode="single"
        >
          <Table.Header>
            <Table.Column>Playlists</Table.Column>
          </Table.Header>
          <Table.Body>
            {playlists.map((playlist) => (
              <Table.Row key={playlist.id}>
                <Table.Cell>{playlist.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      : null}
    </div>
  )
}

export default Playlists