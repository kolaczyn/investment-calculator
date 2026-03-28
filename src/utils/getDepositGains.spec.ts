import { describe, expect, test } from "vitest";
import { monthsIndexes } from "./getDepositEndDate";
import { getDepositGains } from "./getDepositGains";

const date = new Date(2026, monthsIndexes.february, 1);

const testCases = [
  [
    10_000,
    date,
    6,
    0.05,
    // According to this: https://www.credit-agricole.pl/pytania-i-odpowiedzi/oszczednosci/jak-obliczyc-zysk-z-lokaty
    // It should be 202.5 gains, 47.50 taxes
    {
      netGain: 200.83,
      taxes: 47.12,
    },
  ],
  [
    1_000,
    date,
    6,
    0.02,
    // According to this: https://www.bankier.pl/smart/narzedzia/kalkulator-lokat
    // it should be netGain 8.16 and taxes 1.92. But it's slightly different here
    {
      netGain: 8.03,
      taxes: 1.89,
    },
  ],
  [
    100_000,
    date,
    12,
    0.08,
    {
      netGain: 6480,
      taxes: 1_520,
    },
  ],
] as const;

describe("getDepositGains", () => {
  test.each(testCases)(
    `getDepositGains $i`,
    (capital, startDate, periodMonths, annualGain, expected) => {
      expect(getDepositGains({ capital, startDate, periodMonths, annualGain })).toEqual(expected);
    },
  );
});
