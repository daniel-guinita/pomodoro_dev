import { getLessonPageList } from "@/actions/lesson/lesson-page.action";
import { getLesson } from "@/actions/lesson/lesson.action";
import LessonPageForm from "@/components/teacher/lesson-page/add-form";
import LessonPageCardList from "@/components/teacher/lesson-page/card-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import UpdateLessonForm from "@/components/teacher/lesson/update-form";
import Image from "next/image";

type Props = {
  params: {
    id: number;
  };
};

export default async function LessonPagePage({ params }: Props) {
  const { id } = params;
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append("lesson", id.toString());
  const [lessonPageList, lesson] = await Promise.all([
    getLessonPageList(urlSearchParams),
    getLesson(id),
  ]);

  return (
    <div className="container mx-auto flex flex-col py-16 gap-4">
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/teacher">
            <ChevronLeft />
            Lesson List
          </Link>
        </Button>
        <LessonPageForm id={id} />
      </div>
      <Card className="w-screen max-w-sm mx-auto">
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
          <p>{lesson.lesson_pages} pages</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <UpdateLessonForm id={lesson.id} />
          <Button asChild>
            <Link href={`/teacher/quiz-dashboard/${id}`}>Quiz Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
      <h1 className="text-2xl font-bold">Pages</h1>
      <LessonPageCardList lessonPageList={lessonPageList} />
    </div>
  );
}
