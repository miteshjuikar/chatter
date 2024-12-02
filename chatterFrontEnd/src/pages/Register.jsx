import React, { useContext, useState } from 'react';
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { RegisterUser, error, loading } = useContext(AuthContext);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    RegisterUser(formData);
  };

  return (
    <>
      <Form onSubmit={handleRegister}>
        <Row
          style={{
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Registration</h2>
              <Form.Control
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
              >
                Register
              </Button>

              {error && (
                <Alert variant="danger">
                  <p>{error}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
