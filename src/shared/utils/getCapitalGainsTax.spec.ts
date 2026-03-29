import { describe, expect, test } from "vitest";
import { getCapitalGainsTax } from "./getCapitalGainsTax";

const testCases = [[10.08, 1.92]];

describe("getCapitalGainsTax", () => {
  test.each(testCases)(`getCapitalGainsTax (%d) -> %d`, (grossGains, expected) => {
    expect(getCapitalGainsTax(grossGains)).toEqual(expected);
  });
});
