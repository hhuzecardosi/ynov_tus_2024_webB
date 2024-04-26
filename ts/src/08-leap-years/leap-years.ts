export class LeapYearsCalculator {
  isLeapYear(number: number): boolean {
    return number % 4 === 0 && (number % 100 !== 0 || number % 400 === 0);
  }
}