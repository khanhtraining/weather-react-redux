const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const SERVER_ADRESS = process.env.SERVER_ADRESS || 'http://localhost:4000'

function toWeekday (date) {
  const d = new Date(date)
  return weekday[d.getDay()]
}

const locationUri = `${SERVER_ADRESS}/location`

export {
  weekday,
  toWeekday,
  locationUri,
  SERVER_ADRESS
}
