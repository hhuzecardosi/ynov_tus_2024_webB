import {Score, TennisScore} from "./tennis-score";


describe('Tennis Score', () => {
    let tennisScore: TennisScore;

    beforeEach(() => {
      tennisScore = new TennisScore();
    })

    it('should by default return 0 - 0', () => {
        expect(tennisScore.getScore()).toBe('0 - 0');
    });

    it('should return 15 - 0 when first player scores', () => {
        tennisScore.player1Scores();

        expect(tennisScore.getScore()).toBe('15 - 0');
    });

    it('should return 15 - 15 when both players score', () => {
        tennisScore.player1Scores().player2Scores();

        expect(tennisScore.getScore()).toBe(`${Score.Fifteen} - ${Score.Fifteen}`);
    })
});
