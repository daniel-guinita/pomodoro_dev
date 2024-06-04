"use client";
import { LessonPage } from "@/actions/lesson/lesson-page.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextEditor } from "@/components/ui/text-editor";

type Props = {
  lessonPage: LessonPage;
};

export const LessonPageCard = ({ lessonPage }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{lessonPage.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <TextEditor value={lessonPage.contents} editable={false} />
      </CardContent>
    </Card>
  );
};
