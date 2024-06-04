import { getLessonPageList } from "@/actions/lesson/lesson-page.action";
import { LessonPageList } from "@/components/student/lesson-page/lesson-page-list";

type Props = {
  params: {
    id: number;
  };
};

export default async function LessonPagePage({
  params,
}: Props) {
  const { id } = params;
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append("lesson", id.toString());
  const lessonPageList = await getLessonPageList(urlSearchParams);

  return (
    <div className="lg:flex lg:justify-center lg:p-5">
      <LessonPageList
        lessonPageList={lessonPageList}
        lessonId={id}
      />
    </div>
  );
}
