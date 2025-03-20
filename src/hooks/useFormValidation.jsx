import { useState } from 'react';
import { validateVideoUrl } from '../utils/validation';

function useFormValidation() {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'videoUrl':
        if (!value.trim()) {
          error = 'Video URL is required.';
        } else if (!validateVideoUrl(value)) {
          error = 'Please enter a valid YouTube or Vimeo URL.';
        }
        break;
      case 'roomId':
        if (!value.trim()) {
          error = 'Room ID is required.';
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateForm = (fields) => {
    const newErrors = {};
    let isValid = true;

    Object.entries(fields).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return { errors, validateField, validateForm };
}

export default useFormValidation;