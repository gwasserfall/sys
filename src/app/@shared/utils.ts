export function formatDate(date: Date) {
  return date.toISOString().slice(0,10);
}

export function parseDate(date: string) {
  if (date.length != 8) {
    throw new Error(`date: string must be 8 characters long. Got [${date}] length: ${date.length}`)
  }

  let year = parseInt(date.slice(0,5));
  let month = parseInt(date.slice(5,7));
  let day = parseInt(date.slice(7,8));

  let newDate = new Date;
  newDate.setFullYear(year);
  newDate.setMonth(month - 1);
  newDate.setDate(day);

  return newDate;
}
