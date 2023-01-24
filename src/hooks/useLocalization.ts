import React from 'react';
import {
  LocalizationContext,
  LocalizationContextValue,
} from '../contexts/i18n/LocalizationContext';

export function useLocalization(): LocalizationContextValue {
  return React.useContext(LocalizationContext);
}
