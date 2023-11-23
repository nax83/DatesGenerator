import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function EyeTherapy({ title, maxInjections }) {
    const [selectedInjections, setSelectedInjections] = useState(0);
    const [injections, setInjections] = useState(Array.from({ length: maxInjections }, (_, i) => ({ id: i, weeks: 0 })));
  
    const handleDropdownInjectionSelect = (eventKey) => {
      setSelectedInjections(eventKey);
    };

    const handleDropdownSelect = (eventKey, event) => {
      const selectedId = parseInt(event.target.getAttribute('data-id'));
  
      if (selectedId !== undefined) {
        const updatedInjections = injections.map((injection) =>
          injection.id === selectedId ? { ...injection, weeks: parseInt(eventKey) } : injection
        );
  
        setInjections(updatedInjections);
      }
    };

    const injectionsDropdown = injections
    .filter((injection) => injection.id < selectedInjections)
    .map((injection) => (
      <Dropdown key={injection.id} onSelect={handleDropdownSelect}>
        <Dropdown.Toggle variant="success" id={`dropdown-injection-${injection.id}`}>
          Injection {injection.id + 1}: Wait for {injection.weeks} weeks
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {[...Array(maxInjections + 1).keys()].slice(1).map((week) => (
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
    ));

  return (
    <Card>
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
        {injectionsDropdown}
      </Card.Body>
    </Card>
  );
}

export default EyeTherapy;

