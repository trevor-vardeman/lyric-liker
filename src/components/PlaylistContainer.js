import React, { useState, useEffect } from 'react'
import Playlist from './Playlist'

function PlaylistContainer({ token, retrievePlaylists, playlists }) {
  // const playlistsToShow = playlists ? playlists : "No playlists available"

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
      <Playlist  />
      {(playlists.length === null || playlists.length === 0) ? "No playlists available" : playlists.map(playlist => playlist.name)}
    </div>
  )
}

export default PlaylistContainer