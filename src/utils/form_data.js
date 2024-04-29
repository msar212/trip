import dayjs from "dayjs";

export let formatMonthDay = (date, formatStr = "MM月DD日") => {
  return dayjs(date).format(formatStr);
}

export let nextDay = (formatStr = "MM月DD日") => {
  return dayjs().add(1, 'day').format(formatStr);
}

export let getDiffDays = (startDate, endDate) => {
  return dayjs(endDate).diff(startDate,"day")
}