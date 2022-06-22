import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import PopularUrls from "./components/PopularUrls.view";
import UrlInput from "./components/UrlInput.view";
import Navbar from "./components/Navbar.view";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<UrlInput />}></Route>
          <Route exact path="/popular" element={<PopularUrls />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
