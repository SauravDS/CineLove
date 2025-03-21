import { fadeIn } from '../../../src/utils/animations';

describe('Animations Utils', () => {
  describe('fadeIn', () => {
    it('returns correct keyframes for fadeIn animation', () => {
      const animation = fadeIn();
      expect(animation).toEqual({
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      });
    });

    it('returns consistent output with no parameters', () => {
      const animation1 = fadeIn();
      const animation2 = fadeIn();
      expect(animation1).toEqual(animation2);
    });
  });
});