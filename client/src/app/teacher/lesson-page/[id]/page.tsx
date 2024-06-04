import { LessonPage, getLessonPage } from "@/actions/lesson/lesson-page.action";
import { LessonPageCard } from "@/components/teacher/lesson-page/card";
import AddQuizQuestion from "@/components/teacher/quiz_question/add-form";
import UpdateQuizQuestionForm from "@/components/teacher/quiz_question/update-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: {
    id: number;
  };
};

export default async function LessonPagePage({ params }: Props) {
  const { id } = params;
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append("lesson", id.toString());
  const lessonPage: LessonPage = await getLessonPage(id);

  return (
    <div className="container mx-auto py-16 space-y-4">
      <div className="flex justify-between">
        <Button asChild>
          <Link href={`/teacher/lesson/${lessonPage.lesson}`}>
            Go back to Lesson
          </Link>
        </Button>

        {lessonPage.question ? (
          <UpdateQuizQuestionForm id={lessonPage.question} />
        ) : (
          <AddQuizQuestion lessonPage={lessonPage.id} />
        )}
      </div>
      <LessonPageCard lessonPage={lessonPage} />
    </div>
  );
}
