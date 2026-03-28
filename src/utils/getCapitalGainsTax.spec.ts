import { describe, expect, test } from "vitest";
import { getCapitalGainsTax } from "./getCapitalGainsTax";

const testCases = [[1000, 10.08, 1.92]];

describe("getCapitalGainsTax", () => {
  test.each(testCases)(`getCapitalGainsTax (%d, %d) -> %d`, (capital, grossGains, expected) => {
    expect(getCapitalGainsTax(capital, grossGains)).toEqual(expected);
  });
});
