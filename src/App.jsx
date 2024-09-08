import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Pricing from "./page/Pricing";
import Topbar from "./page/Topbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Topbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
