// DatesRow.js
import React, { useState } from 'react';
import { getNextValidDates } from './utils';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function DatesRow({ date, onDateButtonClick}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const validDates = getNextValidDates(date, 3);

  const handleButtonClick = (value) => {
    setSelectedDate(validDates[value]);
    //forward the event to the parent DatesList
    onDateButtonClick(validDates[value]);
  };

  return (
    <div className="Dates">
      <form>
        <ButtonGroup>
          {validDates.map((validDate, index) => (
            <ToggleButton
              key={index}
              id={`radio-${validDate.getTime()}`}
              type="radio"
              name="radio"
              variant={(selectedDate && selectedDate.getTime()) === validDate.getTime() ? 'success' : 'outline-primary'}
              value={index}
              checked={(selectedDate && selectedDate.getTime()) === validDate.getTime()}
              onChange={(e) => {handleButtonClick(e.currentTarget.value)}}
            >
              {validDate.toLocaleDateString('it-IT', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </form>
      <br/>
    </div>
  );
}

export default DatesRow;
