import React, { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function SubmitLyrics() {
  const [track, setTrack] = useState("")
  const [artist, setArtist] = useState("")  
  const [album, setAlbum] = useState("")
  const [art, setArt] = useState("")
  const [lyrics, setLyrics] = useState("")

  function saveLyrics(e) {
    e.preventDefault()
    const songData = {
      name: track,
      artist: artist,
      album: album,
      album_art: art,
      lyrics: lyrics,
    }
    fetch("http://localhost:3004/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songData),
    })
      .then(res => res.json())
      .then((song) => {
        alert(`${song.name} saved!`)
        setTrack("")
        setArtist("")
        setAlbum("")
        setArt("")
        setLyrics("")
      })
      .catch(err => alert(err.message))
  }

  return (
    <Stack className="d-flex justify-content-center align-items-center" style={{ paddingBottom: "0.5rem" }}>
      <h1 className="font-link" style={{ textAlign: "center" }}>Submit Lyrics</h1>
      <p>Please enter all fields below.</p>
      <Form onSubmit={(e) => saveLyrics(e)}>
        <Stack direction="horizontal" gap={3}>
          <Form.Group className="mb-3" controlId="Song Title">
            <Form.Label>Song Title</Form.Label>
            <Form.Control required type="text" placeholder="Title" value={track} onChange={(e) => setTrack(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Artist Name">
            <Form.Label>Artist Name</Form.Label>
            <Form.Control required type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
          </Form.Group>
        </Stack>
        <Stack direction="horizontal" gap={3}>
          <Form.Group className="mb-3" controlId="Album Name">
            <Form.Label>Album Name</Form.Label>
            <Form.Control required type="text" placeholder="Album" value={album} onChange={(e) => setAlbum(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Link to Album Art">
            <Form.Label>Album Art</Form.Label>
            <Form.Control required type="" placeholder="URL for Album Art" value={art} onChange={(e) => setArt(e.target.value)} />
          </Form.Group>
        </Stack>
        <Form.Group className="mb-3" controlId="Lyrics">
          <Form.Label>Lyrics</Form.Label>
          <Form.Control required as="textarea" rows={10} placeholder="Lyrics" value={lyrics} onChange={(e) => setLyrics(e.target.value)} />
        </Form.Group>
        <Stack>
        <Button variant="outline-primary" type="submit">Submit</Button>
        </Stack>
      </Form>
    </Stack>
  )
}

export default SubmitLyrics