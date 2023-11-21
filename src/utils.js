// utils.js
function weeksToDays(numberOfWeeks) {
  return numberOfWeeks * 7 + 1;
}

function getNextValidDates(inputDate, numberOfDates = 3, minWeeks = 4) {
  const daysToCheck = [2, 3, 4]; // Tuesday, Wednesday, Thursday represented as 2, 3, 4 (respectively)
  const minDays = weeksToDays(minWeeks); // Convert minWeeks to minDays
  const addDays = [minDays, 1, 1]; //Minimum number of days to add for each date

  const getNextValidDate = (startDate, daysToAdd) => {
    let nextDate = new Date(startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    while (!daysToCheck.includes(nextDate.getUTCDay())) {
      nextDate = new Date(nextDate.getTime() + 24 * 60 * 60 * 1000);
    }
    return nextDate;
  };

  const validDates = [];
  let currentDate = inputDate;

  for (let i = 0; i < numberOfDates; i++) {
    currentDate = getNextValidDate(currentDate, addDays[i]);
    validDates.push(currentDate);
  }

  return validDates;
}
  
export { getNextValidDates, weeksToDays };
  