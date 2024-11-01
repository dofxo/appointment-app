export type reserveDateType = {
  date: string;
  id: string;
  time: string;
  profile_picture: string;
  userName: string;
};

export type reservredDatesArrayType = reserveDateType[];

export interface InputInfo {
  name: "password" | "confirmPassword" | "username"; // restrict to known values
  label: string;
  type?: string;
  ref?: React.Ref<any>;
  hide?: boolean;
}

export interface FormValues {
  password: string;
  confirmPassword: string;
  username: string;
  profilePicture: string;
}

export type inputTypes = null | HTMLInputElement;
