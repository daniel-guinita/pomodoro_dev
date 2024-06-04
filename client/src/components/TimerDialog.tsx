import { LessonPage } from "@/actions/lesson/lesson-page.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CiClock1 } from "react-icons/ci";
import { Separator } from "./ui/separator";

type Props = {
  lessonPage: LessonPage;
  handleShowForceQuiz: () => void;
};

export default function TimerDialog({
  lessonPage,
  handleShowForceQuiz,
}: Props) {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingSeconds <= 0) {
        clearInterval(timer);
        handleShowForceQuiz();
      } else {
        setRemainingSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    window.onbeforeunload = () => {
      localStorage.setItem("seconds", remainingSeconds.toString());
    };

    return () => {
      window.onbeforeunload = null;
      clearInterval(timer);
    };
  }, [remainingSeconds]);

  useEffect(() => {
    const savedSeconds = Number(localStorage.getItem("seconds"));
    if (!isNaN(savedSeconds) && savedSeconds) {
      setRemainingSeconds(savedSeconds);
      console.log(savedSeconds);
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={cn(
            "bg-primary lg:w-[50px] lg:h-[50px] lg:rounded-full lg:flex lg:justify-center lg:items-center opacity-30 hover:opacity-100 transition-all duration-300",
            remainingSeconds % 2 === 0 &&
              remainingSeconds <= 10 &&
              "bg-red-500 text-white opacity-100"
          )}
        >
          <CiClock1 className="lg:w-[25px] lg:h-[25px] text-primary-foreground" />
        </div>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[800px] lg:h-[300px]">
        <DialogHeader>
          <DialogTitle>Timer</DialogTitle>
          <Separator />
          <DialogDescription className="lg:flex lg:justify-center items-center lg:h-full">
            <strong className="lg:text-[100px]">
              {Math.floor(remainingSeconds / 60)
                .toString()
                .padStart(2, "0")}
              :{(remainingSeconds % 60).toString().padStart(2, "0")}
            </strong>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
