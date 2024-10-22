import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Button } from "@mui/material";

import { useState, useRef } from "react";

import "./style.scss";

import DateStep from "./DateStep";
import UserNameStep from "./userNameStep";
import TimeStep from "./TimeStep";

const UserPage = () => {
  const [step, setStep] = useState(1);

  const [userName, setUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const submitButtonRef = useRef<null | HTMLButtonElement>(null);

  const userNameInputRef = useRef<null | HTMLInputElement>(null);

  return (
    <div className="mt-[50px]">
      {step === 1 && (
        <UserNameStep
          userNameInputRef={userNameInputRef}
          setStep={setStep}
          setUserName={setUserName}
          submitButtonRef={submitButtonRef}
        />
      )}
      {step === 2 && (
        <DateStep
          userName={userName}
          setSelectedDate={setSelectedDate}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <TimeStep
          userName={userName}
          selectedDate={selectedDate}
          setStep={setStep}
          setUserName={setUserName}
        />
      )}

      <div
        style={{ display: step >= 4 ? "none" : "" }}
        className="button-wrapper flex gap-5 items-center justify-center mt-[50px]"
      >
        <Button
          variant="contained"
          disabled={step === 1}
          onClick={() => setStep((prev) => prev - 1)}
          className="prevNextBtn"
        >
          <HiChevronRight />
        </Button>
        <Button
          variant="contained"
          style={{ display: step >= 2 ? "none" : "" }}
          className="prevNextBtn"
          onClick={() => {
            if (submitButtonRef.current) {
              submitButtonRef.current.click();
            }
          }}
        >
          <HiChevronLeft />
        </Button>
      </div>
    </div>
  );
};

export default UserPage;
