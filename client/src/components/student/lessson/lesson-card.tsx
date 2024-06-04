"use client";
import { addLessonResourceType } from "@/actions/lesson/lesson-resource-type.action";
import { Lesson, getLessonScore } from "@/actions/lesson/lesson.action";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  lesson: Lesson;
};

export default function LessonCard({ lesson }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLessonScore(lesson.id);
      setData(response);
      console.log(response);
    };

    fetchData();
  }, []);

  const submitLessonResourceType = async (type: string) => {
    const result = await addLessonResourceType({ type, lesson: lesson.id });
    if (result.id) {
      return router.push(`/lesson/${lesson.id}?resourceType=${type}`);
    }
    setOpen(false);
    toast.error("You've already completed this lesson");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="lg:cursor-pointer lg:flex lg:flex-col lg:p-3 col-span-3">
          <CardHeader>
            {lesson.coverImage && (
              <AspectRatio>
                <Image
                  alt="Cover Image"
                  src={lesson.coverImage}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            )}
          </CardHeader>
          <CardContent className="lg:text-start">
            <h5 className="lg:text-[20px] lg:font-semibold">{lesson.title}</h5>
            <p>{lesson.subtitle}</p>
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-col items-start">
            <p>{lesson.lesson_pages} pages</p>
            {data && data.over > 0 && (
              <strong>
                Your Score: {data.score}/{data.over}
              </strong>
            )}
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="lg:flex lg:flex-col lg:justify-center lg:items-center">
          <DialogTitle className="lg:text-[25px] lg:font-bold text-center">
            What’s your preferred learning resource for this lesson?
          </DialogTitle>
          <DialogDescription className="lg:flex lg:justify-center lg:items-center lg:gap-5">
            <Button onClick={() => submitLessonResourceType("TEXT")}>
              Text
            </Button>
            <Button onClick={() => submitLessonResourceType("VIDEO")}>
              Video
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
