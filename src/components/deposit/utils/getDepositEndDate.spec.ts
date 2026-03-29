import { describe, expect, test } from "vitest";
import { getDepositEndDate, monthsIndexes } from "./getDepositEndDate";

const periodMonths = 3;

const testCases = [
  [new Date(2026, monthsIndexes.january, 1), new Date(2026, monthsIndexes.april, 1)],
  [new Date(2025, monthsIndexes.november, 30), new Date(2026, monthsIndexes.february, 28)],
  // leap year
  [new Date(2023, monthsIndexes.november, 30), new Date(2024, monthsIndexes.february, 29)],
];

describe("getDepositEndDate", () => {
  test.each(testCases)(`getDepositEndDate (%s, ${periodMonths}) -> %s`, (input, expected) => {
    expect(getDepositEndDate(input, periodMonths)).toEqual(expected);
  });
});
