import moment from "jalali-moment";

export const convertToPersianDate = (
  dateObject: Date,
  type: "date" | "time",
) => {
  if (!dateObject) return;

  const date = moment(dateObject).locale("fa").format(`YYYY/MM/DD`);
  const time = moment(dateObject).locale("fa").format(`HH:mm`);

  return type === "date" ? date : time;
};
