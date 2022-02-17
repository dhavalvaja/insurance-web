import React from 'react';
import { Button, Card, Container, Form, FormGroup } from 'react-bootstrap';
import '../CSS/feedback.css'

export default function Feedback() {
  return (
    <>
      <Container className='d-flex align-items-center justify-content-center' style={{minHeight:"100vh"}} >
        <Card>
          <Card.Body>
            <FormGroup>
              <Form.Label>
                Feedback
              </Form.Label>
              <Form.Control type={'text'}>

              </Form.Control>
            </FormGroup>
            <Button variant="primary">Button #1</Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
