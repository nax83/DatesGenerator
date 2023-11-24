// utils.js
function weeksToDays(numberOfWeeks) {
  return numberOfWeeks * 7 + 1;
}

function updateArray(arr, num) {
  const currentLength = arr.length;

  if (num > currentLength) {
    const additionalElements = num - currentLength;
    for (let i = 0; i < additionalElements; ++i) {
      const elemLength = currentLength + i;
      arr.push({ id: elemLength, weeks: 0 });
    }
  } else if (num < currentLength) {
    arr.splice(num);
  }
  return arr;
}

function combineDates(arr1, arr2) {
  const combinedDates = [];
  const maxLength = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < arr1.length) {
      combinedDates.push(arr1[i]);
    }
    if (i < arr2.length) {
      combinedDates.push(arr2[i]);
    }
  }

  return combinedDates;
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
  
export { getNextValidDates, weeksToDays, updateArray, combineDates };
  