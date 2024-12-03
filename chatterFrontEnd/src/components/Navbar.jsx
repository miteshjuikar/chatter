import React, { useContext } from 'react';
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import Cookies from "js-cookie"; 

const NavBar = () => {
  const { user, setUser, setError } = useContext(AuthContext);

  const handleLogout = () => {
    Cookies.remove("token"); 
    setError(null);
    setUser(null); 
  };

  return (
    <Navbar bg='dark' className='mb-4' style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to={"/"} className='link-light text-decoration-none'>
            ChatterApp
          </Link>
        </h2>

        <span className='text-warning'>
          {user ? `Logged in as ${user.name}` : "Click on login or register"}
        </span>

        <Nav>
          {
            user ? 
              <Link onClick={handleLogout} to={"/login"} className='link-light text-decoration-none'>
                Logout
              </Link>
            : 
              <Stack direction='horizontal' gap={3}>
                <Link to={"/login"} className='link-light text-decoration-none'>
                  Login
                </Link>
                <Link to={"/register"} className='link-light text-decoration-none'>
                  Register
                </Link>
              </Stack>
          }
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
