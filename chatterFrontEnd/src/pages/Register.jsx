import React from 'react'
import { Alert, Button, Form, Row, Col, Stack  } from "react-bootstrap"

const Register = () => {
  return (
    <>
    <Form>
      <Row style={{
        height: "calc(100vh - 3.75rem)",
        justifyContent: "center",
        paddingTop: "10%"
      }}>
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Registration</h2>
            <Form.Control type='text' placeholder='Name'/>
            <Form.Control type='email' placeholder='Email'/>
            <Form.Control type='password' placeholder='Password'/>
            <Button variant='primary' type='submit'>
              Register
            </Button>

            <Alert variant='danger'>
              <p>An error occured</p>
            </Alert>
          </Stack>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default Register