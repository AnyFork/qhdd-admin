const timeStampToDate = (timeStamp: number): Date => {
  return new Date(timeStamp)
}

const dateTotimeStamp = (date?: Date): number => {
  return date?.getTime() || new Date().getTime()
}

const stringToDate = (dateStr: string): Date => {
  return new Date(dateStr)
}
export { dateTotimeStamp, timeStampToDate, stringToDate }
