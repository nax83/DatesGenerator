// DatesList.js
import React, { useState } from 'react';
import DatesRow from './DatesRow';
import { combineDates } from './utils';

function DatesList() {

  const [datesList, setDatesList] = useState([]);

  const updateDatesList = (injections) => {
    console.log(injections);
  }

  const handleDateButtonClick = (index, selectedDate) => {

    const newDatesList = [...datesList];

    if (!newDatesList[index]?.next) {
      // Case 1: No linked Dates, create a new linked Dates
      const newLinkedDates = { id: Math.random(), next: null, date: selectedDate };
      newDatesList[index].next = newLinkedDates;
      newDatesList.push(newLinkedDates);
    } else {
      // Case 2: Remove linked Dates and subsequent ones, add a new linked Dates
      let currentDates = newDatesList[index];
      while (currentDates?.next) {
        const nextId = currentDates.next.id;
        newDatesList.splice(
          newDatesList.findIndex((item) => item.id === nextId),
          1
        );
        currentDates = currentDates.next;
      }

      const newLinkedDates = { id: Math.random(), next: null, date: selectedDate };
      newDatesList[index].next = newLinkedDates;
      newDatesList.push(newLinkedDates);
    }

    setDatesList(newDatesList);
  };

  return (
    <div className="DatesList">
      {datesList.map((dates, index) => (
        <DatesRow
          key={dates.id}
          date={dates.date}
          minWeeks={dates.minWeeks}
          onDateButtonClick={(selectedDate) => handleDateButtonClick(index, selectedDate)}
        />
      ))}
    </div>
  );
}

export default DatesList;
