import { Lesson } from "@/actions/lesson/lesson.action";
import LessonCard from "@/components/student/lessson/lesson-card";

type Props = {
  lessonList: Lesson[];
};

export const LessonList = ({ lessonList }: Props) => {
  return (
    <div className="grid grid-cols-12 w-full gap-4">
      {lessonList.map((lesson) => (
        <LessonCard lesson={lesson} key={lesson.id} />
      ))}
    </div>
  );
};
