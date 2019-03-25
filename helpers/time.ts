const twentyFourToTwelveHour = (t: string) => {
  // Check correct time format and split into components
  let time = t.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    t
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    //@ts-ignore -- navigation options
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
};

const hoursOfOperationTo12Hours = (hOfOp: string) => {
  const regex = /([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/g;
  return hOfOp.replace(regex, twentyFourToTwelveHour);
};

export { twentyFourToTwelveHour, hoursOfOperationTo12Hours };
