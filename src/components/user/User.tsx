import { useState, useEffect } from "react";
import { HiChevronRight } from "react-icons/hi";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LinearProgress from "@mui/material/LinearProgress";
import "./style.scss";
import { supabase } from "../../Supabase/initialize";
import TitleAdder from "../../HOC/TitleAdder";
import { DateStep, TimeStep } from "../";
import PhoneNumberAddModal from "./PhoneNumberAddModal";
import { format } from "date-fns-jalali";
import { convertToPersianDate } from "../../helpers/converToPersianDate";

const UserPage = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [showState, setShowState] = useState<"reserves" | "new">("reserves");
  const [loading, setLoading] = useState(false);
  const [phoneNumberModalStatus, setPhoneNumberModalStatus] = useState(false);
  const [reserveInfo, setReserveInfo] = useState<null | {
    id: string;
    created_at: string;
    date: string;
    time: string;
    userName: string;
  }>();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", localStorage.getItem("token"))
          .single();

        const reservedDate = user.reserve;

        if (!reservedDate) return;

        const { data: reseve, error: error2 } = await supabase
          .from("reserves")
          .select("*")
          .eq("id", reservedDate)
          .single();

        setReserveInfo(reseve);

        if (error) throw error;
        if (error2) throw error2;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [forceRender]);

  return (
    <div className="">
      <div className="button-wrapper flex gap-2 justify-center mb-[60px]">
        {!reserveInfo ? (
          <Button
            variant="contained"
            className="!font-[inherit]"
            onClick={() => setShowState("new")}
            style={{ color: showState === "new" ? "blue" : "" }}
          >
            رزرو جدید
          </Button>
        ) : null}
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
        loading ? (
          <Box sx={{ width: "30%" }}>
            <LinearProgress />
          </Box>
        ) : !reserveInfo ? (
          <span className="text-yellow-500 text-2xl">نوبتی رزرو نشده است.</span>
        ) : (
          <Card className="w-[50%] rounded">
            <CardContent>
              <Typography
                gutterBottom
                component="h1"
                className="!font-[inherit]"
              >
                اطلاعات رزرو
              </Typography>
              <div className="wrapper">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between">
                    <span>تاریخ:</span>
                    <span>
                      {convertToPersianDate(new Date(reserveInfo.date))}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>زمان:</span>
                    <span>{format(new Date(reserveInfo.date), "HH:mm")}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardActions className="flex justify-center">
              <LoadingButton
                loading={buttonLoading}
                size="small"
                variant="contained"
                className="!bg-red-500 w-[200px]"
                onClick={async () => {
                  try {
                    setButtonLoading(true);

                    const { error: error } = await supabase
                      .from("users")
                      .update({ reserve: null })
                      .eq("id", localStorage.getItem("token"))
                      .select();

                    const { error: error2 } = await supabase
                      .from("reserves")
                      .update({ userName: null })
                      .eq("id", reserveInfo.id)
                      .select();

                    setReserveInfo(null);

                    if (error) throw error;
                    if (error2) throw error2;
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setButtonLoading(false);
                  }
                }}
              >
                کنسل نوبت
              </LoadingButton>
            </CardActions>
          </Card>
        )
      ) : (
        <>
          {step === 1 && (
            <DateStep setSelectedDate={setSelectedDate} setStep={setStep} />
          )}
          {step === 2 && (
            <TimeStep
              selectedDate={selectedDate}
              setStep={setStep}
              setForceRender={setForceRender}
              setShowState={setShowState}
              setPhoneNumberModalStatus={setPhoneNumberModalStatus}
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

            <PhoneNumberAddModal
              phoneNumberModalStatus={phoneNumberModalStatus}
              setPhoneNumberModalStatus={setPhoneNumberModalStatus}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TitleAdder(UserPage, "کاربر");
