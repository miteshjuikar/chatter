import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Container } from 'react-bootstrap';
import NavBar from "./components/Navbar";
import './index.css';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route
            path="/"
            element={user ? <Chat /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Redirect all undefined paths to home */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
