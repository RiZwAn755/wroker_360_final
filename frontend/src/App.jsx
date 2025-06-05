import { BrowserRouter, Routes, Route } from "react-router-dom";
import Aboutus from "./components/aboutUs";
import Nav from "./components/navbar";
import Hero from "./components/hero";
import Hireworker from "./components/hireworkers";
import Login from "./components/login";
import Private from "./components/privateComp";
import Signup from "./components/signup";
import Footer from "./components/footer";
import AddWorker from "./components/addworker";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "120vh" }}>
        <Nav />

        <div style={{ flex: 1 }}>
          <Routes>
            {/* Protected Routes */}
            <Route element={<Private />}>
              <Route path="/" element={<Hero />} />
              <Route path="/hireworker" element={<Hireworker />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/addworker" element={<AddWorker />} />
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
