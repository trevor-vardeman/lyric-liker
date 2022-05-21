import './App.css'
import { NextUIProvider } from '@nextui-org/react'
import Login from './Login'
import SpotifyContainer from './SpotifyContainer'
import LyricContainer from './LyricContainer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NextUIProvider>
          <Login />
          <SpotifyContainer />
          <LyricContainer />
          </NextUIProvider>
      </header>
    </div>
  );
}

export default App;
