import {BirthdayNotebook} from "./birthdays";

describe("birthdays", function () {
    let notebook: BirthdayNotebook;
    beforeEach(() => {
        notebook = new BirthdayNotebook();

    })

    it('should return nothing if no birthdays have been stored', () => {
        expect(notebook.getBirthdays(new Date())).toHaveLength(0);
    });

    it('should return no birthday if asked on a different date than an existing birthday', () => {
        notebook.addBirthday('John', new Date(2020, 0, 1));

        expect(notebook.getBirthdays(new Date(2024, 0, 2))).toHaveLength(0);
    });

    it('should return one birthday if asked on the same date than an existing birthday', () => {
        notebook.addBirthday('Alice', new Date(2020, 0, 1));
        notebook.addBirthday('Bob', new Date(2020, 0, 2));

        const birthdays = notebook.getBirthdays(new Date(2024, 0, 2));
        expect(birthdays).toHaveLength(1);
        expect(birthdays[0]).toBe('Bob');
    });

    it('should return two birthdays if asked on the same date than two existing birthdays', () => {
        notebook.addBirthday('Alice', new Date(2020, 0, 1));
        notebook.addBirthday('Bob', new Date(2015, 0, 1));

        const birthdays = notebook.getBirthdays(new Date(2024, 0, 1));
        expect(birthdays).toHaveLength(2);

        // Bloc 1 ==> Boite blanche
        expect(birthdays[0]).toBe('Alice');
        expect(birthdays[1]).toBe('Bob');

        // Bloc 2 ==> Boite noire
        expect(birthdays).toContain('Alice');
        expect(birthdays).toContain('Bob');
    });

});
