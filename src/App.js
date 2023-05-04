import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Repetidos from "./components/Repetidos";
import Album from "./components/Album";
import Comprar from "./components/Comprar";
import Home from "./components/Home";
import { useState } from "react";

const initialAuth = null;

function App() {
  const [auth, setAuth] = useState(initialAuth);

  const handleAuth = (e) => {
    if (auth) {
      setAuth(null);
    } else {
      setAuth(true);
    }
  };

  return (
    <div>
      <HashRouter>
        <header>
          <h1>Album Pokemon</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link className="active" to="figuritas/">
              Figuritas
            </Link>
            <Link className="active" to="album/">
              Album
            </Link>
            <Link className="active" to="quiosko/">
              Quiosko
            </Link>
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={<Home auth={auth} handleAuth={handleAuth} />}
          />
          <Route path="figuritas/*" element={<Repetidos auth={auth} />} />
          <Route path="album/*" element={<Album />} />
          <Route path="quiosko/*" element={<Comprar />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
