"use client";

import { LessonPage } from "@/actions/lesson/lesson-page.action";
import AiChatDialog from "@/components/AiChatDialog";
import { QuizModal } from "@/components/QuizModal";
import TimerDialog from "@/components/TimerDialog";
import { LessonPageCard } from "@/components/student/lesson-page/lesson-page-card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  lessonPageList: LessonPage[];
  lessonId: number;
};

export const LessonPageList = ({ lessonPageList, lessonId }: Props) => {
  const router = useRouter();
  const [lessonPageIndex, setLessonPageIndex] = useState(0);
  const [lessonPage, setLessonPage] = useState<LessonPage>(
    lessonPageList[lessonPageIndex]
  );
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  const nextLessonPage = () => {
    setLessonPageIndex((prev) => prev + 1);
    const index = lessonPageIndex + 1;
    localStorage.setItem("lessonPageIndex", index.toString());
  };

  useEffect(() => {
    const savedIndex = Number(localStorage.getItem("lessonPageIndex"));
    if (!isNaN(savedIndex)) {
      setLessonPageIndex(savedIndex);
    }
  }, []);

  useEffect(() => {
    if (lessonPageIndex >= lessonPageList.length) {
      toast.success("Congratulations you've completed the lesson!");
      localStorage.removeItem("lessonPageIndex");
      setTime(0);
      router.push(`/lesson/${lessonId}/completed`);
    } else {
      setTime(0);
      setLessonPage(lessonPageList[lessonPageIndex]);
    }
  }, [lessonPageIndex]);

  return (
    <div className="flex justify-center p-5 w-full">
      <div className="container">
        <strong>
          Time Taken:{" "}
          <span className="text-xl">
            {Math.floor(time / 60)
              .toString()
              .padStart(2, "0")}
            :{(time % 60).toString().padStart(2, "0")}
          </span>
        </strong>
        <LessonPageCard lessonPage={lessonPage} />
      </div>
      <div className="fixed bottom-12 mx-auto w-full">
        <div className="container flex flex-col items-end gap-5">
          <AiChatDialog />
          <QuizModal
            id={lessonPage.question}
            nextLessonPage={nextLessonPage}
            time={time}
          />
        </div>
      </div>
    </div>
  );
};
