import { NavLink } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

function NavBar({ logout }) {
  return (
    <Stack direction="horizontal" gap={3} style={{backgroundColor: "skyblue", justifyContent: "space-between"}}>
      <h1 className="font-link" style={{fontSize: "30px"}}>Lyric Liker</h1>
      <NavLink className="btn btn-outline-dark btn-sm" to="/playlists">Playlists</NavLink>
      <NavLink className="btn btn-outline-dark btn-sm" to="/saved-lyrics">Saved Lyrics</NavLink>
      <Button onClick={() => logout()} size="sm" variant="outline-dark">Logout</Button>
    </Stack>
  )
}

export default NavBar