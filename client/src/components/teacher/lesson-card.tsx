"use client";
import { Lesson } from "@/actions/lesson/lesson.action";
import UpdateLessonForm from "@/components/teacher/lesson/update-form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

type Props = {
  lesson: Lesson;
};

export default function LessonCard({ lesson }: Props) {
  return (
    <Card className="w-screen max-w-sm">
      <CardHeader>
        <Link href={`/teacher/lesson/${lesson.id}`}>
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
        </Link>
      </CardHeader>
      <CardContent className="lg:text-start">
        <h5 className="lg:text-[20px] lg:font-semibold">{lesson.title}</h5>
        <p>{lesson.subtitle}</p>
        <Separator />
        <p>
          {lesson.lesson_pages} pages
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <UpdateLessonForm id={lesson.id} />
        <Button asChild>
          <Link href={`/teacher/quiz-dashboard/${lesson.id}`}>Quiz Dashboard</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
