import React from 'react'
import { Card } from '@nextui-org/react'

function Playlists(playlists) {
  return (
    <div>
      <Card bordered hoverable clickable color="black" shadow={true} css={{ mw: "auto", height: "auto" }}>
        <p>{playlists.playlist.name}</p>
      </Card>
    </div>
  )
}

export default Playlists