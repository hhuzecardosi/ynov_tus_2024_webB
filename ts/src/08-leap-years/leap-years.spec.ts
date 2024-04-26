import  { LeapYearsCalculator } from './leap-years';

describe('leapYears', () => {
  let leapYearsCalculator: LeapYearsCalculator

  beforeAll(() => {
    leapYearsCalculator = new LeapYearsCalculator();
  });

  it('should return true if the year is divisible by 4', () => {
    expect(leapYearsCalculator.isLeapYear(4)).toBe(true);
  });

  it('should return false if the year is not divisible by 4', () => {
    expect(leapYearsCalculator.isLeapYear(3)).toBe(false);
  });

  it('should return true if the year is divisible by 400', () => {
    expect(leapYearsCalculator.isLeapYear(2000)).toBe(true);
  });


  it('should return true if the year is divisible by 4 but not by 100', () => {
    expect(leapYearsCalculator.isLeapYear(2004)).toBe(true);
  })

  it('should return false if the year is divisible by 100 but not by 400', () => {
    expect(leapYearsCalculator.isLeapYear(1900)).toBe(false);
  });
});
