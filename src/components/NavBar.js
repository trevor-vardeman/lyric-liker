import { NavLink } from 'react-router-dom'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import githubLogo from "../images/GitHub-Mark-32px.png"

function NavBar({ token, logout }) {
  return (
    <Stack direction="horizontal" gap={3} style={{backgroundColor: "slategrey", justifyContent: "space-evenly", padding: "5px"}}>
      {!token ? null : <Button onClick={() => logout()} size="sm" variant="outline-danger">Logout</Button>}
      <NavLink className="btn btn-outline-dark btn-sm" to="/playlists">Playlists</NavLink>
      <NavLink className="btn btn-outline-dark btn-sm" to="/saved-lyrics">Saved Lyrics</NavLink>
    </Stack>
  )
}

export default NavBar