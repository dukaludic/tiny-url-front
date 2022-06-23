import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import PopularUrls from "./components/PopularUrls.view";
import UrlInput from "./components/UrlInput.view";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar.view";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<UrlInput />}></Route>
            <Route exact path="/popular" element={<PopularUrls />}></Route>
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
