import { getLessonList } from "@/actions/lesson/lesson.action";
import CourseDetails from "@/components/CourseDetails";
import { LessonList } from "@/components/student/lessson/lesson-list";

export default async function Home() {
  const result = await getLessonList()
  if(result.error){
    throw new Error(result.message)
  }

  return (
    <div className="lg:flex lg:justify-center">
      <div className="lg:w-[1300px] lg:h-[500px] lg:px-5 lg:mt-5 lg:flex lg:flex-col lg:gap-5">
        <h2 className="lg:text-[35px] lg:font-bold">Dashboard</h2>
        <CourseDetails />
        <div>
          <LessonList lessonList={result} />
        </div>
      </div>
    </div>
  );
}
