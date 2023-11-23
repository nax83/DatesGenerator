import React from 'react';
import './App.css';
import EyeTherapy from './EyeTherapy'; // Assuming EyeTherapy component is available
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatesList from './DatesList';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
              <EyeTherapy title="Left Eye Therapy" maxInjections={5} />
          </Col>
          <Col>
              <EyeTherapy title="Right Eye Therapy" maxInjections={5} />
          </Col>
        </Row>
      </Container>
      <DatesList/>
    </div>
  );
}

export default App;
