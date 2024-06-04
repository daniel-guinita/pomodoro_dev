import { Dashboard } from "@/actions/lesson/lesson.action";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  quizDashboard: Dashboard[];
};

export default function QuizDashboardTable({ quizDashboard }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Learning Resource Type</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Time Taken</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quizDashboard.map((quiz, index) => (
          <TableRow key={index}>
            <TableCell>
              {quiz.student.first_name + " " + quiz.student.last_name}
            </TableCell>
            <TableCell>{quiz.resourceType}</TableCell>
            <TableCell>
              {quiz.score.correct_answer}/{quiz.score.over}
            </TableCell>
            <TableCell>
              {Math.floor(quiz.time / 60)
                .toString()
                .padStart(2, "0")}
              :{(quiz.time % 60).toString().padStart(2, "0")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
