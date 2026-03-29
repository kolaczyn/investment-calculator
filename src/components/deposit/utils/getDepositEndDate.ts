// taken from https://stackoverflow.com/a/16353241
const isLeapYear = (year: number) => (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

export const monthsIndexes = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const getMonthsLength = (year: number) => [
  // january
  31,
  // february
  isLeapYear(year) ? 29 : 28,
  // march
  31,
  // april
  30,
  // may
  31,
  // june
  30,
  // july
  31,
  // august
  31,
  // september
  30,
  // october
  31,
  // november
  30,
  // december
  31,
];

export const getDepositEndDate = (startDate: Date, periodMonths: number) => {
  const currentMonth = startDate.getMonth();
  const endMonth = currentMonth + periodMonths;
  const isNextYear = endMonth >= 11;
  const endYear = startDate.getFullYear() + (isNextYear ? 1 : 0);
  const endMonthTrimmed = endMonth % 12;

  const monthsLength = getMonthsLength(endYear);

  const endMonthDays = monthsLength[endMonthTrimmed];

  if (endMonthDays == null) {
    // This is probably impossible to achieve
    throw new Error("month length out of scope");
  }

  const endDateOfMonth = Math.min(startDate.getDate(), endMonthDays);

  return new Date(endYear, endMonthTrimmed, endDateOfMonth);
};
