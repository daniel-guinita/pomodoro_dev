"use client";
import { QuizQuestion, getQuizQuestion } from "@/actions/quiz/question.action";
import { addStudentAnswer } from "@/actions/quiz/student-answer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  question: z.number(),
  answer: z.number(),
});

type Props = {
  id?: number;
  nextLessonPage: () => void;
  time: number;
};

export const QuizModal = ({ id, nextLessonPage, time }: Props) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState<QuizQuestion>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fetchData = async (quizQuestionId: number) => {
    try {
      const result = await getQuizQuestion(quizQuestionId);
      setLoading(false);
      if (result.message) {
        if (result.statusCode === 404) {
          notFound();
        } else {
          toast.error(result.message);
          return;
        }
      }
      setQuestion(result);
      form.reset({
        question: result.id,
      });
    } catch (error: any) {
      setLoading(false);
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (open && id) {
      fetchData(id);
    }
  }, [open]);

  if (!id) {
    return <Button onClick={() => nextLessonPage()}>Next Page</Button>;
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await addStudentAnswer({ ...values, time });
    if (!result.message) {
      toast.success("Successfully Answered");
      setOpen(false);
      nextLessonPage();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Start Quiz</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{question?.text}</DialogTitle>
          <DialogDescription>
              Time Taken: {Math.floor(time / 60)
                .toString()
                .padStart(2, "0")}
              :{(time % 60).toString().padStart(2, "0")}
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Choices</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(e) => field.onChange(parseInt(e))}
                        className="flex flex-col space-y-1"
                      >
                        {question?.answers.map((answer) => (
                          <FormItem
                            className="flex items-center space-x-3 space-y-0"
                            key={answer.id}
                          >
                            <FormControl>
                              <RadioGroupItem value={answer.id.toString()} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {answer.text}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
