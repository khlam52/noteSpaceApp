import React from 'react';
import {
  ThemeContext,
  ThemeContextValue,
} from '../contexts/theme/ThemeContext';

export function useAppTheme(): ThemeContextValue {
  return React.useContext(ThemeContext);
}
