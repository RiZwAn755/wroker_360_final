import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/navbar";
import Private from "./components/privateComp";
import Footer from "./components/footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Workers from "./pages/Workers";
import Register from "./pages/Register";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "120vh" }}>
        <Nav />

        <div style={{ flex: 1 }}>
          <Routes>
            {/* Protected Routes */}
            <Route element={<Private />}>
              <Route path="/" element={<Home />} />
              <Route path="/hireworker" element={<Workers />} />
              <Route path="/aboutus" element={<About />} />
              <Route path="/addworker" element={<Register />} />
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;