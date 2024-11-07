export const convertPersianToEnglishNumbers = (number: string) => {
  return number.replace(/[۰-۹]/g, (char) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(char)));
};
