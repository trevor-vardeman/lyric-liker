import { NavLink, Link } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

function NavBar({ logout }) {
  return (
    <Stack direction="horizontal" gap={3} style={{ backgroundColor: "skyblue", justifyContent: "space-between", borderBottom: "2px solid black" }}>
      <Link className="font-link" style={{ fontSize: "30px", textDecoration: "none", color: "black" }} to="/">Lyric Liker</Link>
      <NavLink className="btn btn-outline-dark btn-sm" to="/playlists">Playlists</NavLink>
      <NavLink className="btn btn-outline-dark btn-sm" to="/saved-lyrics">Saved Lyrics</NavLink>
      <Button onClick={() => logout()} size="sm" variant="outline-dark">Logout</Button>
    </Stack>
  )
}

export default NavBar