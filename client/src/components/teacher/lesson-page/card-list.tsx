import { LessonPage } from "@/actions/lesson/lesson-page.action";
import { LessonPageUpdateForm } from "@/components/teacher/lesson-page/update-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  lessonPageList: LessonPage[];
};

export default function LessonPageCardList({ lessonPageList }: Props) {
  return (
    <div className="flex flex-col gap-8 py-4 ">
      {lessonPageList.map((lessonPage) => (
        <div
          className="flex justify-between p-4 border items-center"
          key={lessonPage.id}
        >
          <Button variant="link" asChild>
            <Link href={`/teacher/lesson-page/${lessonPage.id}`}>
              {lessonPage.title}
            </Link>
          </Button>
          <LessonPageUpdateForm id={lessonPage.id} />
        </div>
      ))}
    </div>
  );
}
