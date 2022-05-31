import React from 'react'
import './index.css'
import ReactDOM from "react-dom/client"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import App from './components/App'
import Playlists from './components/Playlists'
import Songs from './components/Songs'
import Lyrics from './components/Lyrics'
import SavedLyrics from './components/SavedLyrics'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <BrowserRouter>
  //   <Routes>
  //     <Route exact path="/" element={<App />}>  
  //       <Route exact path="/playlists" element={<Playlists />} />
  //       <Route exact path="/songs" element={<Songs />} />
  //       <Route exact path="/lyrics" element={<Lyrics />} />
  //       <Route exact path="saved-lyrics" element={<SavedLyrics />} />
  //     </Route>
  //   </Routes>
  // </BrowserRouter> 

  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)