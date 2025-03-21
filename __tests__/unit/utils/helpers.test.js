import { formatChatTime } from '../../../src/utils/helpers';

describe('helpers Utility', () => {
  describe('formatChatTime', () => {
    it('formats timestamp to HH:MM AM/PM', () => {
      const timestamp = 1677654321000; // Example: 2023-03-01 15:45:21 UTC
      const result = formatChatTime(timestamp);
      expect(result).toBe('03:45 PM'); // Adjust based on your timezone
    });

    it('handles invalid timestamp gracefully', () => {
      expect(formatChatTime(null)).toBe('Invalid time');
      expect(formatChatTime(undefined)).toBe('Invalid time');
      expect(formatChatTime('not-a-number')).toBe('Invalid time');
    });

    it('pads single-digit hours and minutes', () => {
      const timestamp = 1677610800000; // Example: 2023-03-01 02:00:00 UTC
      const result = formatChatTime(timestamp);
      expect(result).toBe('02:00 AM'); // Adjust based on your timezone
    });
  });
});