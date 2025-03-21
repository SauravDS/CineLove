import { validateVideoUrl } from '../../../src/utils/validation';

describe('Validation Utils', () => {
  describe('validateVideoUrl', () => {
    it('returns false for invalid inputs', () => {
      expect(validateVideoUrl('')).toBe(false);
      expect(validateVideoUrl(null)).toBe(false);
      expect(validateVideoUrl('invalid-url')).toBe(false);
      expect(validateVideoUrl(123)).toBe(false);
    });

    it('returns true for valid YouTube URLs', () => {
      expect(validateVideoUrl('https://www.youtube.com/watch?v=12345678901')).toBe(true);
      expect(validateVideoUrl('https://youtu.be/12345678901')).toBe(true);
      expect(validateVideoUrl('https://youtube.com/embed/12345678901')).toBe(true);
    });

    it('returns true for valid Vimeo URLs', () => {
      expect(validateVideoUrl('https://vimeo.com/123456789')).toBe(true);
      expect(validateVideoUrl('https://www.vimeo.com/123456789')).toBe(true);
    });

    it('returns false for malformed video URLs', () => {
      expect(validateVideoUrl('https://youtube.com/watch?v=short')).toBe(false);
      expect(validateVideoUrl('https://vimeo.com/not-a-number')).toBe(false);
    });
  });
});