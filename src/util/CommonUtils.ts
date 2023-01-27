import moment from 'moment';

const getMomentToday = () => {
  return moment().utcOffset('+0800');
};

export default { getMomentToday };
