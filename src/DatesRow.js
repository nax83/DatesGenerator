// DatesRow.js
import React, { useState } from 'react';
import { getNextValidDates } from './utils';

function DatesRow({ date, onDateButtonClick}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const validDates = getNextValidDates(date, 3); // Fetch an array of 3 valid dates

  const handleButtonClick = (index) => {
    setSelectedDate(validDates[index]);
    onDateButtonClick(validDates[index]);
  };

  return (
    <div className="Dates">
      {validDates.map((validDate, index) => (
        <button key={index} onClick={() => handleButtonClick(index)}>
          {validDate.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </button>
      ))}
      {selectedDate && <p>Selected Date: {selectedDate.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>}
    </div>
  );
}

export default DatesRow;
