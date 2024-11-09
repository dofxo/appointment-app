export type reserveDateType = {
  date: string;
  id: string;
  time: string;
  profile_picture: string;
  userName: string;
  phone_number: string;
};

export type reservredDatesArrayType = reserveDateType[];

export interface InputInfo {
  name: "password" | "confirmPassword" | "username" | "phoneNumber"; // restrict to known values
  label: string;
  type?: string;
  ref?: React.Ref<any>;
  hide?: boolean;
  inputMode?:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
}

export interface FormValues {
  password: string;
  confirmPassword: string;
  username: string;
  profilePicture?: string;
  phoneNumber: string;
}

export type inputTypes = null | HTMLInputElement;
