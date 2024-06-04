"use client";
import { LessonPage } from "@/actions/lesson/lesson-page.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TextEditor } from "@/components/ui/text-editor";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  lessonPage: LessonPage;
};

export const LessonPageCard = ({ lessonPage }: Props) => {
  const searchParams = useSearchParams();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lessonPage.title}</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        {searchParams.get("resourceType")?.toUpperCase() === "TEXT" ? (
          <TextEditor value={lessonPage.contents} editable={false} />
        ) : (
          <div className="flex flex-col">
            {lessonPage.video && (
              <video width="100%" height="100%" controls>
                <source src={lessonPage.video} type="video/mp4" />
              </video>
            )}

            <Separator />
            {lessonPage.video_link ? (
              <>
                <h1>You can also use this link</h1>
                <Link href={lessonPage.video_link}>
                  {lessonPage.video_link}
                </Link>
              </>
            ) : (
              <h1>No Link available</h1>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
