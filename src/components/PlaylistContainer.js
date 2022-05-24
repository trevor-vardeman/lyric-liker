import React, { useState, useEffect } from 'react'
import Playlists from './Playlists'

function PlaylistContainer({ playlists }) {
  // const [playlists, setPlaylists] = useState([])
  // const playlistsToShow = playlists ? playlists : "No playlists available"
  // console.log(playlists)
  // const isTokenNull = !token ? true : false

  // useEffect(() => {
  //   fetch("https://api.spotify.com/v1/me/playlists", {
  //     method: "GET",
  //     headers: {
  //       "Authorization": `Bearer ${token}`,
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => setPlaylists(data.items))
  //     .catch(err => alert(err.message))
  // }, [token])

  return (
    <div>
      {/* {playlists.length === undefined || playlists.length === 0 ? "No playlists available" : <Playlists />} */}
      hi
    </div>
  )
}

export default PlaylistContainer