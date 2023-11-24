import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { updateArray } from './utils';
import 'bootstrap/dist/css/bootstrap.min.css';

function EyeTherapy({ id, title, maxInjections, onUpdateInjections }) {
    const [selectedInjections, setSelectedInjections] = useState(0);
    const [injections, setInjections] = useState([]);
    const waitingTime = [2, 4, 6, 8];
    
    const handleDropdownInjectionSelect = (eventKey) => {
      setSelectedInjections(eventKey);
      const updatedInjections = updateArray(injections, eventKey);
      setInjections(updatedInjections);
    };

    const handleDropdownSelect = (eventKey, event) => {
      const selectedId = parseInt(event.target.getAttribute('data-id'));
  
      if (selectedId !== undefined) {
        const updatedInjections = injections.map((injection) =>
          injection.id === selectedId ? { ...injection, weeks: parseInt(eventKey) } : injection
        );
        setInjections(updatedInjections);
        onUpdateInjections({id:id, updatedInjections:updatedInjections});
      }
    };

    const injectionsDropdown = injections
    .filter((injection) => injection.id < selectedInjections)
    .map((injection) => (
      <Col key={injection.id} xs={12} sm={6} md={4}>
        <Dropdown key={`dropdown-injection-${Math.random()}`} onSelect={handleDropdownSelect}>
          <Dropdown.Toggle variant="success" id={`dropdown-injection-${injection.id}`}>
            Injection {injection.id + 1}: {injection.weeks !== -1 ? "q"+ injection.weeks : "-"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {waitingTime.map((week) => (
              <Dropdown.Item
                key={week}
                eventKey={week}
                data-id={injection.id}
              >
                {week} weeks
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    ));

  const rows = [];
  for (let i = 0; i < injectionsDropdown.length; i += 3) {
    rows.push(
      <>
        <br/>
        <Row key={i}>
          {injectionsDropdown.slice(i, i + 3)}
        </Row>
      </>
    );
  }

  return (
    <Card key={title}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Dropdown onSelect={handleDropdownInjectionSelect}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Number of Injections: {selectedInjections}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {[...Array(maxInjections + 1).keys()].map((injection) => (
              <Dropdown.Item key={injection} eventKey={injection}>
                {injection}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <br/>
        {rows}
      </Card.Body>
    </Card>
  );
}

export default EyeTherapy;

