"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
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
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  searchParams?: {
    resourceType?: string;
  };
};

export default function LessonCard({ searchParams }: Props) {
  const resourceType = searchParams?.resourceType || "";

  return (
    <Dialog>
      <DialogTrigger>
        <Card className="lg:cursor-pointer lg:flex lg:flex-col lg:p-3">
          <CardHeader className="lg:w-full">
            <CardTitle>Image</CardTitle>
          </CardHeader>
          <CardContent className="lg:text-start">
            <h5 className="lg:text-[20px] lg:font-semibold">First Lesson</h5>
            <p>Subtitle ni sa first lesson</p>
          </CardContent>
          <Separator />
          <CardFooter>
            <p>0 pages 0 files</p>
          </CardFooter>
          <Button asChild className="lg:mb-3">
            <Link href="/teacher/edit-lesson">EDIT</Link>
          </Button>
          <Button asChild>
            <Link href="/teacher/quiz-dashboard">Quiz Dashboard</Link>
          </Button>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="lg:flex lg:flex-col lg:justify-center lg:items-center">
          <DialogTitle className="lg:text-[25px] lg:font-bold text-center">
            What’s your preferred learning resource for this lesson?
          </DialogTitle>
          <DialogDescription className="lg:flex lg:justify-center lg:items-center lg:gap-5">
            <Button asChild>
              <Link href={`/student/text-lesson?resourceType=text`}>Text</Link>
            </Button>
            <Button asChild>
              <Link href={`/student/video-lesson?resourceType=video`}>
                Video
              </Link>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
