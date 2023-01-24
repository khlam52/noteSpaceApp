import DataPersister from '../util/DataPersister';

const enum StorageKey {
  DB_KEY_SAVED_LOCALE = '@locale',
  DB_KEY_SAVED_THEME = '@theme',
  DB_KEY_SAVED_IS_FIRST_LAUNCH = '@isFirstLaunch',
  DB_KEY_SAVED_IS_LOGGED_IN = '@isLoggedIn',
}

// Locale i18n
async function setLocale(locale: string): Promise<void> {
  return DataPersister.setString(StorageKey.DB_KEY_SAVED_LOCALE, locale);
}

async function getLocale(): Promise<any> {
  return DataPersister.getString(StorageKey.DB_KEY_SAVED_LOCALE);
}

export default {
  setLocale,
  getLocale,
};
