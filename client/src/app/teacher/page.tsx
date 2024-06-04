import { getLessonList } from "@/actions/lesson/lesson.action";
import CourseDetails from "@/components/CourseDetails";
import { LessonList } from "@/components/teacher/lesson-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const result = await getLessonList();
  if (result.error) {
    throw new Error(result.message);
  }

  return (
    <div className="container mx-auto py-16">
      <h2 className="lg:text-[35px] lg:font-bold">Dashboard</h2>
      <CourseDetails />
      <div className="lg:flex lg:w-full lg:gap-4">
        <Button className="lg:w-full lg:h-[90px]" asChild>
          <Link href="/teacher/create-lesson">ADD A NEW LESSON</Link>
        </Button>
        <Button className="lg:w-full lg:h-[90px]">VIEW QUERIES</Button>
      </div>
      <div>
        <Suspense fallback="Loading...">
          <LessonList lessonList={result} />
        </Suspense>
      </div>
    </div>
  );
}
