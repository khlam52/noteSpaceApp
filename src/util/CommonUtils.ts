import i18n from 'i18next';
import moment from 'moment';

const getMomentDate = (
  date: Date,
  preSetDateFormat = null,
  dateFormat = 'DD MMMM YYYY, ddd HH:mm',
  local = 'en',
) => {
  let returnDate = 'N/A';
  if (i18n.language === 'zh-Hant' || i18n.language === 'zh-Hans') {
    local = 'zh-hk';
    dateFormat = 'llll';
  }

  if (date && preSetDateFormat) {
    returnDate =
      moment(date, preSetDateFormat).isValid() === true
        ? moment(date, preSetDateFormat)
            .utcOffset('+0800')
            .locale(local)
            .format(dateFormat)
        : 'N/A';
  } else if (date && !preSetDateFormat) {
    returnDate =
      moment(date).isValid() === true
        ? moment(date).utcOffset('+0800').locale(local).format(dateFormat)
        : 'N/A';
  }
  if (returnDate === 'Invalid date') {
    returnDate = 'N/A';
  }

  return returnDate;
};
const getMomentToday = () => {
  return moment().utcOffset('+0800');
};

export default { getMomentToday, getMomentDate };
