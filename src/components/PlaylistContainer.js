import React, { useEffect } from 'react'
import Playlist from './Playlist'

function PlaylistContainer({ token, retrievePlaylists, playlists }) {
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
      playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))
      : null}
    </div>
  )
}

export default PlaylistContainer