import { useAuth } from "./hooks/useAuth";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import NotFound from "./components/pages/NotFound";
import EditProfile from "./components/pages/EditProfile";
import Profile from "./components/pages/Profile";
import Header from "./components/ui/Header";
import Container from "./components/ui/Container";
import Footer from "./components/ui/Footer";


function App() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route index path="/" element={authenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={authenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={authenticated ? <Navigate to="/" /> : <Register />} />
          <Route path="/profile" element={authenticated ? <EditProfile /> : <Navigate to="/login" />} />
          <Route path="/users/:id" element={authenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App;
