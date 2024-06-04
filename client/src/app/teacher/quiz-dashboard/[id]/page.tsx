import {
  Lesson,
  getResourceTypeCount,
  getLesson,
  getQuizDashboard,
} from "@/actions/lesson/lesson.action";
import { PieChartPlot } from "@/components/quiz-dashboard/pie-chart";
import QuizDashboardTable from "@/components/quiz-dashboard/table";

type Props = {
  params: {
    id: number;
  };
};

export default async function QuizDashboard({ params }: Props) {
  const { id } = params;

  const [lesson, quizDashboard, resourceTypeCount] = await Promise.all([
    getLesson(id),
    getQuizDashboard(id),
    getResourceTypeCount(id),
  ]);

  return (
    <div className="lg:flex lg:justify-center lg:items-center">
      <div className="lg:w-[1000px] lg:flex lg:flex-col lg:mt-5 lg:gap-5">
        <strong>{lesson.title}</strong>
        <p>{lesson.subtitle}</p>
        <div className="lg:w-full lg:flex lg:justify-center lg:items-center h-52">
          <PieChartPlot resourceTypeCount={resourceTypeCount} />
        </div>
        <div>
          <QuizDashboardTable quizDashboard={quizDashboard} />
        </div>
      </div>
    </div>
  );
}
