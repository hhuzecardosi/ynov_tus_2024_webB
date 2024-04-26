function isDivisibleBy(divider: number, year: number) {
    return year % divider === 0;
}

function isLeapYear(year: number) {
    return isDivisibleBy(400, year) || (isDivisibleBy(4, year) && !isDivisibleBy(100, year) );
}

describe('isLeapYears', () => {
    it.each([{year: 2000, isLeap: true}, {year: 2100, isLeap:false}, {year: 2004, isLeap: true}, {year: 2003, isLeap:false}])(`should return $isLeap when year is $year`, ({isLeap, year}) => {
        expect(isLeapYear(year)).toBe(isLeap);
    })

    it('should return true if year is divisible by 400 ', () => {
        expect(isLeapYear(2000)).toBe(true);
    });

    it('should return false if year is divisible by 100 but not by 400', () => {
        expect(isLeapYear(2100)).toBe(false);
    });

    it('should return true if year is divisible by 4 but not 100', () => {
        expect(isLeapYear(2004)).toBe(true);
    })

    it('should return false if year is not divisible by 4', () => {
        expect(isLeapYear(2003)).toBe(false);
    })
});
