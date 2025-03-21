import { renderHook, act } from '@testing-library/react';
import useFormValidation from '../../../src/hooks/useFormValidation';

describe('useFormValidation Hook', () => {
  it('validates videoUrl field', () => {
    const { result } = renderHook(() => useFormValidation());

    act(() => {
      result.current.validateField('videoUrl', '');
    });
    expect(result.current.errors.videoUrl).toBe('Video URL is required.');

    act(() => {
      result.current.validateField('videoUrl', 'invalid-url');
    });
    expect(result.current.errors.videoUrl).toBe('Please enter a valid YouTube or Vimeo URL.');

    act(() => {
      result.current.validateField('videoUrl', 'https://youtube.com/watch?v=12345678901');
    });
    expect(result.current.errors.videoUrl).toBe('');
  });

  it('validates roomId field', () => {
    const { result } = renderHook(() => useFormValidation());

    act(() => {
      result.current.validateField('roomId', '');
    });
    expect(result.current.errors.roomId).toBe('Room ID is required.');

    act(() => {
      result.current.validateField('roomId', 'abc123');
    });
    expect(result.current.errors.roomId).toBe('');
  });

  it('validates entire form', () => {
    const { result } = renderHook(() => useFormValidation());

    act(() => {
      const isValid = result.current.validateForm({
        videoUrl: '',
        roomId: 'abc123',
      });
      expect(isValid).toBe(false);
      expect(result.current.errors.videoUrl).toBe('Video URL is required.');
      expect(result.current.errors.roomId).toBe('');
    });

    act(() => {
      const isValid = result.current.validateForm({
        videoUrl: 'https://vimeo.com/123456789',
        roomId: 'abc123',
      });
      expect(isValid).toBe(true);
      expect(result.current.errors.videoUrl).toBe('');
      expect(result.current.errors.roomId).toBe('');
    });
  });
});