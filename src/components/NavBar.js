import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'

function NavBar({ token, logout }) {
  return (
    <div>
      {!token ? null : <Button onClick={() => logout()} variant="danger">Logout</Button>}
      <NavLink to="/playlists">Playlists</NavLink>
      <NavLink to="/songs">Songs</NavLink>
      <NavLink to="/lyrics">Lyrics</NavLink>
      <NavLink to="/saved-lyrics">Saved Lyrics</NavLink>
    </div>
  )
}

export default NavBar