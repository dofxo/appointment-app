import { Input, InputAdornment } from "@mui/material";
import { MdOutlineAccountCircle } from "react-icons/md";

const UserNameStep = ({
  userNameInputRef,
  userName,
}: {
  userNameInputRef: React.MutableRefObject<HTMLInputElement | null>;
  userName: string;
}) => {
  return (
    <div className="first-step">
      <div className="input-wrapper flex flex-col mt-[40px] gap-4 text-start max-w-[200px]">
        <label htmlFor="name">نام و نام خانوادگی</label>
        <Input
          className="rounded bg-[#00A9FF] outline-none p-1 !text-white w-[200px] "
          startAdornment={
            <InputAdornment position="start">
              <MdOutlineAccountCircle className="ml-2 w-[20px] h-[20px] fill-white" />
            </InputAdornment>
          }
          inputRef={userNameInputRef}
          type="text"
          name="name"
          id="name"
          defaultValue={userName}
        />
      </div>
    </div>
  );
};

export default UserNameStep;
