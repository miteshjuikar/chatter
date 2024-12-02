import React, { useContext, useState } from 'react';
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { LoginUser, error, loading } = useContext(AuthContext);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    LoginUser(formData);
  };

  return (
    <>
      <Form onSubmit={handleLogin}>
        <Row style={{
          justifyContent: "center",
          paddingTop: "10%",
        }}>
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              {/* Conditionally render the error alert only if an error exists */}
              {error && <Alert variant="danger">{error}</Alert>}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
