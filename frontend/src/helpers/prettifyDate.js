import moment from 'moment';

export function prettifyDate(date_of_hike) {
  return moment(date_of_hike).format('dddd, MMMM Qo, YYYY [at] h:mm A')
}

export function prettifyShortDate(date_of_hike) {
  return moment(date_of_hike).format('MMM Qo [@] h:mm A')
}
