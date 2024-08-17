interface DateObject {
  year: number;
  month: number;
  day: number;
  era: string;
  calendar: any
}

export const convertToDate = (dateObject: DateObject): Date => {
  const { year, month, day } = dateObject;
  return new Date(year, month - 1, day);
};