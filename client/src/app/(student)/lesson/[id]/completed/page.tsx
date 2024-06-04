import { getLesson } from "@/actions/lesson/lesson.action";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { PowerIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import QuestionImg from "@/assets/img/4529164.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {
  params: {
    id: number;
  };
};

export default async function LessonCompletedPage({ params }: Props) {
  const { id } = params;

  const lesson = await getLesson(id);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Card>
        <CardHeader className="w-screen max-w-lg">
          <AspectRatio>
            <Image
              alt="Question"
              src={QuestionImg}
              fill
              className="object-cover"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent>
          <CardTitle>{lesson.title} Completed</CardTitle>
          <CardFooter className="flex justify-center">
            <Link href="/" className="mt-8">
              <Button variant="link">Back to home</Button>
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
