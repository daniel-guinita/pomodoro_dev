import { Lesson } from "@/actions/lesson/lesson.action";
import LessonCard from "@/components/teacher/lesson-card";

type Props = {
  lessonList: Lesson[];
};

export const LessonList = ({ lessonList }: Props) => {
  return (
    <div className="grid grid-cols-3">
      {lessonList.map((lesson) => (
        <div className="col-span-3 md:col-span-1" key={lesson.id}>
          <LessonCard lesson={lesson} />
        </div>
      ))}
    </div>
  );
};
