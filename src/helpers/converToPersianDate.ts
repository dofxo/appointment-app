import { format } from "date-fns-jalali";

export const convertToPersianDate = (date: Date) => {
  const dateValue = new Date(date);

  const year = format(new Date(dateValue), "yyyy");
  const month = format(new Date(dateValue), "MMMM");
  const day = format(new Date(dateValue), "d");

  return dateValue ? `${day} ${month}/ ${year}` : "-";
};
