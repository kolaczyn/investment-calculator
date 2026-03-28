import { describe, expect, test } from "vitest";
import { dateDiffInDays } from "./dateDiffInDays";
import { monthsIndexes } from "./getDepositEndDate";

const testCases: [Date, Date, number][] = [
  [new Date(2026, monthsIndexes.february, 1), new Date(2026, monthsIndexes.may, 1), 89],
  // leap year
  [new Date(2004, monthsIndexes.february, 1), new Date(2004, monthsIndexes.may, 1), 90],
  [new Date(2023, monthsIndexes.may, 15), new Date(2023, monthsIndexes.august, 15), 92],
  [new Date("2017-01-01"), new Date("2017-07-25"), 205],
];

describe("dateDiffInDays", () => {
  test.each(testCases)(`datesDiff(%s, %s) -> %d`, (start, end, expected) => {
    expect(dateDiffInDays(start, end)).toEqual(expected);
  });
});
