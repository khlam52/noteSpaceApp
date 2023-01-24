import { Locale } from '../constants/Constants';
import { resources } from '../contexts/i18n/LocalizationContext';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: typeof resources[Locale.en];
  }
}
