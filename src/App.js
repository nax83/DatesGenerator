import React, { useState, useRef } from 'react';
import './App.css';
import EyeTherapy from './EyeTherapy'; // Assuming EyeTherapy component is available
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatesList from './DatesList';

function App() {

  const [injectionsData, setInjectionsData] = useState([]);
  const datesListRef = useRef(null);

  // Function to handle injections updates received from EyeTherapy component
  const handleInjectionsUpdate = (updatedInjectionsList) => {
    injectionsData[updatedInjectionsList.id] = updatedInjectionsList.updatedInjections;
    console.log(injectionsData);
    setInjectionsData(injectionsData);
    if (datesListRef.current) {
      // For example, assuming DatesList has a method updateStatus(status)
      datesListRef.current.updateDatesList(injectionsData);
    }
  };
  
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
              <EyeTherapy id="LE" title="Left Eye Therapy" maxInjections={5} onUpdateInjections={handleInjectionsUpdate}/>
          </Col>
          <Col>
              <EyeTherapy id="RE" title="Right Eye Therapy" maxInjections={5} onUpdateInjections={handleInjectionsUpdate}/>
          </Col>
        </Row>
      </Container>
      <DatesList ref={datesListRef}/>
    </div>
  );
}

export default App;
