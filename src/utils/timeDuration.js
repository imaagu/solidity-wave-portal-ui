const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const timeDuration = (timeString) => {
  const _data =
    timeString.getDate() +
    " " +
    Months[timeString.getMonth()] +
    "," +
    timeString.getFullYear();
  return _data;
};

module.exports = {
  timeDuration,
};
