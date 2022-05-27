import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Login from './Login'
import Playlists from './Playlists'
import Songs from './Songs'

function App() {
  const [token, setToken] = useState()
  const [allPlaylists, setAllPlaylists] = useState([])
  const [currentPlaylistId, setCurrentPlaylistId] = useState("")
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState([])

  function saveToken(token) {
    setToken(token)
  }

  function logout() {
    setToken(null)
    window.localStorage.removeItem("token")
    setAllPlaylists([])
  }

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
          setAllPlaylists(data.items)
        })
    }
  }, [token])

  function clickPlaylist(e) {
    setCurrentPlaylistId(e.target.id)
  }

  useEffect(() => {
    if (token != null) {
    fetch(`https://api.spotify.com/v1/playlists/${currentPlaylistId}/tracks`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        setCurrentPlaylistTracks(data.items)
        console.log(data.items)
      })
    }
  }, [currentPlaylistId])

  return (
    <Container>
      <Login token={token} saveToken={saveToken} logout={logout} />
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          <Playlists token={token} allPlaylists={allPlaylists} clickPlaylist={clickPlaylist} />
        </Col>
        <Col xs lg="2">
          <Songs currentPlaylistTracks={currentPlaylistTracks} />
        </Col>
      </Row>
    </Container>
  )
}

export default App;