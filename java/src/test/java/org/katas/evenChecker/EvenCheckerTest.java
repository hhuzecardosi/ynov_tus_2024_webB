package org.katas.evenChecker;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EvenCheckerTest {
    private static EvenChecker checker;

    @BeforeEach()
    public void setUp() {
        checker = new EvenChecker();
    }

    @Test
    public void should_returnFalse_whenNumberIsOdd() {
        checker.add(3);

        Assertions.assertFalse(checker.isEven());
    }

    @Test
    public void should_returnTrue_whenNumberIsEven() {
        checker.add(2);

        Assertions.assertTrue(checker.isEven());
        // Assertions.assertEquals(true, checker.isEven());
    }

}