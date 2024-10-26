import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Button } from "@mui/material";

import { useState, useRef } from "react";

import "./style.scss";

import DateStep from "./DateStep";
import TimeStep from "./TimeStep";

const UserPage = ({ userName }: { userName: string }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const submitButtonRef = useRef<null | HTMLButtonElement>(null);
  const [showState, setShowState] = useState<"reserves" | "new">("reserves");

  return (
    <div className="">
      <div className="button-wrapper flex gap-2 justify-center mb-[60px]">
        <Button
          variant="contained"
          className="!font-[inherit]"
          onClick={() => setShowState("new")}
          style={{ color: showState === "new" ? "blue" : "" }}
        >
          رزرو جدید
        </Button>
        <Button
          onClick={() => setShowState("reserves")}
          variant="contained"
          className="!font-[inherit]"
          style={{ color: showState === "reserves" ? "blue" : "" }}
        >
          لیست رزرو ها
        </Button>
      </div>
      {showState === "reserves" ? (
        "reserves"
      ) : (
        <>
          {step === 1 && (
            <DateStep
              userName={userName}
              setSelectedDate={setSelectedDate}
              setStep={setStep}
            />
          )}
          {step === 2 && (
            <TimeStep
              userName={userName}
              selectedDate={selectedDate}
              setStep={setStep}
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
        </>
      )}
    </div>
  );
};

export default UserPage;
